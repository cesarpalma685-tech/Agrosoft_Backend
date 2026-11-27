import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";
import { CrearVentaDto } from "../dto/crear-venta.dto";
import { Venta } from "../../domain/entities/crear-venta.entity";
import { ClienteRepository } from "../../../../identidad/clientes/aplication/ports/cliente.repository";
import { LoteProduccionRepositoryPort } from "../../../../produccion/lote-produccion/application/ports/lote-produccion.repository.port";
import { CrearMovimientoProduccionUseCase } from "../../../../produccion/movimiento-produccion/application/use-cases/crear-movimiento-produccion.use-case";
import { VentaDetalleRepositoryPort } from "../../../ventas_detalles/application/ports/venta-detalle.repository.port";
import { VentaDetalle } from "../../../ventas_detalles/domain/entities/venta-detalle.entity";
import { FacturaRepositoryPort } from "../../../factura/application/ports/factura.repository.port";
import { Factura } from "../../../factura/domain/entities/factura.entity";
import { ConsultarVentasUseCase } from "./consultar-ventas.use-case";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;
const DIAS_VENCIMIENTO = 15;

@Injectable()
export class RegistrarVentaUseCase {
  constructor(
    private readonly ventaRepository: VentaRepositoryPort,
    private readonly clienteRepository: ClienteRepository,
    private readonly loteRepository: LoteProduccionRepositoryPort,
    private readonly movimiento: CrearMovimientoProduccionUseCase,
    private readonly detalleRepository: VentaDetalleRepositoryPort,
    private readonly facturaRepository: FacturaRepositoryPort,
    private readonly consultar: ConsultarVentasUseCase,
  ) {}

  async execute(dto: CrearVentaDto, usuarioId: number) {
    const cliente = await this.clienteRepository.buscarPorId(dto.clienteId);
    if (!cliente) throw new NotFoundException(`El cliente con ID ${dto.clienteId} no existe`);

    // Todo se valida antes de guardar: si falta stock en una línea no se vende nada.
    const pedido = new Map<number, number>();
    for (const l of dto.detalles) pedido.set(l.loteProduccionId, (pedido.get(l.loteProduccionId) ?? 0) + l.cantidadKg);
    const lotes = new Map<number, Awaited<ReturnType<LoteProduccionRepositoryPort["findById"]>>>();
    for (const [loteId, kg] of pedido) {
      const lote = await this.loteRepository.findById(loteId);
      if (!lote) throw new NotFoundException(`La cosecha con ID ${loteId} no existe`);
      if (lote.productoAgroId == null) throw new BadRequestException(`La cosecha ${loteId} no tiene producto asignado`);
      if (kg > lote.stockDisponibleKg) {
        throw new BadRequestException(`No hay suficiente stock en la cosecha ${loteId}: pides ${kg} kg y hay ${lote.stockDisponibleKg} kg`);
      }
      lotes.set(loteId, lote);
    }

    const lineas = dto.detalles.map((l) => {
      const lote = lotes.get(l.loteProduccionId)!;
      const costoUnitarioKg = Number(lote.costoUnitarioKg ?? 0);
      return {
        ...l,
        lote,
        precioTotal: redondear(l.cantidadKg * l.precioUnitarioKg),
        costoUnitarioKg,
        costoTotal: redondear(l.cantidadKg * costoUnitarioKg),
      };
    });
    const subtotal = redondear(lineas.reduce((s, l) => s + l.precioTotal, 0));
    const descuento = dto.descuento ?? 0;
    const impuestos = dto.impuestos ?? 0;
    const total = redondear(subtotal - descuento + impuestos);
    if (total <= 0) throw new BadRequestException("El total de la venta debe ser mayor a cero");

    const venta = new Venta();
    Object.assign(venta, { fecha: new Date(dto.fecha), clienteId: dto.clienteId, subtotal, descuento, impuestos, total, estado: "pendiente_pago", usuarioId });
    const guardada = await this.ventaRepository.save(venta);

    for (const l of lineas) {
      // Descuenta el stock de la cosecha y deja el movimiento de salida (RF7.5)
      await this.movimiento.execute({
        loteProduccionId: l.loteProduccionId,
        tipo: "salida",
        cantidadKg: l.cantidadKg,
        costoUnitarioKg: l.costoUnitarioKg,
        costoTotal: l.costoTotal,
        ventaId: guardada.id,
        descripcion: `Venta #${guardada.id}`,
        usuarioId,
      });
      const detalle = new VentaDetalle();
      Object.assign(detalle, {
        ventaId: guardada.id,
        productoAgroId: l.lote!.productoAgroId,
        loteProduccionId: l.loteProduccionId,
        cultivoId: l.lote!.cultivoId,
        cantidadKg: l.cantidadKg,
        precioUnitarioKg: l.precioUnitarioKg,
        precioTotal: l.precioTotal,
        costoUnitarioKg: l.costoUnitarioKg,
        costoTotal: l.costoTotal,
      });
      await this.detalleRepository.save(detalle);
    }

    // Factura: se genera con la venta (RF8.5)
    const emision = new Date(dto.fecha);
    const vencimiento = new Date(emision);
    vencimiento.setDate(vencimiento.getDate() + DIAS_VENCIMIENTO);
    const factura = new Factura();
    Object.assign(factura, { ventaId: guardada.id, prefijo: "AGS", numero: String(guardada.id).padStart(6, "0"), fechaEmision: emision, vencimiento });
    await this.facturaRepository.save(factura);

    return await this.consultar.obtener(guardada.id);
  }
}
