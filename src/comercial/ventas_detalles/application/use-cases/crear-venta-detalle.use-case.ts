import { Injectable } from "@nestjs/common";
import { VentaDetalleRepositoryPort } from "../ports/venta-detalle.repository.port";
import { CrearVentaDetalleDto } from "../dto/crear-venta-detalle.dto";
import { VentaDetalle } from "../../domain/entities/venta-detalle.entity";
import { CrearMovimientoProduccionUseCase } from "../../../../produccion/movimiento-produccion/application/use-cases/crear-movimiento-produccion.use-case";

@Injectable()
export class CrearVentaDetalleUseCase {
  constructor(
    private readonly repository: VentaDetalleRepositoryPort,
    private readonly crearMovimiento: CrearMovimientoProduccionUseCase,
  ) {}

  async execute(dto: CrearVentaDetalleDto): Promise<VentaDetalle> {
    // Si la venta sale de un lote de producción, registra la salida primero:
    // valida el stock y descuenta antes de guardar el detalle.
    if (dto.loteProduccionId) {
      await this.crearMovimiento.execute({
        loteProduccionId: dto.loteProduccionId,
        tipo: "salida",
        cantidadKg: dto.cantidadKg,
        costoUnitarioKg: dto.costoUnitarioKg,
        costoTotal: dto.costoTotal,
        ventaId: dto.ventaId,
        descripcion: `Venta #${dto.ventaId}`,
      });
    }

    const nuevoDetalle = new VentaDetalle();
    Object.assign(nuevoDetalle, dto);
    return await this.repository.save(nuevoDetalle);
  }
}
