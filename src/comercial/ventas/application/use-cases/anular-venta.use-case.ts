import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";
import { VentaDetalleRepositoryPort } from "../../../ventas_detalles/application/ports/venta-detalle.repository.port";
import { CrearMovimientoProduccionUseCase } from "../../../../produccion/movimiento-produccion/application/use-cases/crear-movimiento-produccion.use-case";
import { ConsultarVentasUseCase } from "./consultar-ventas.use-case";

@Injectable()
export class AnularVentaUseCase {
  constructor(
    private readonly ventaRepository: VentaRepositoryPort,
    private readonly detalleRepository: VentaDetalleRepositoryPort,
    private readonly movimiento: CrearMovimientoProduccionUseCase,
    private readonly consultar: ConsultarVentasUseCase,
  ) {}

  async execute(ventaId: number, motivo: string, usuarioId: number) {
    const venta = await this.ventaRepository.findById(ventaId);
    if (!venta) throw new NotFoundException(`La venta con ID ${ventaId} no existe`);
    if (venta.estado === "anulada") throw new BadRequestException("La venta ya está anulada");

    // Los kg vuelven a la cosecha de la que salieron (RF8.6)
    const detalles = await this.detalleRepository.findByVentaId(ventaId);
    for (const d of detalles) {
      if (!d.loteProduccionId) continue;
      await this.movimiento.execute({
        loteProduccionId: d.loteProduccionId,
        tipo: "entrada",
        cantidadKg: d.cantidadKg,
        costoUnitarioKg: d.costoUnitarioKg,
        costoTotal: d.costoTotal,
        ventaId,
        descripcion: `Anulación de la venta #${ventaId}`,
        usuarioId,
      });
    }

    await this.ventaRepository.update(ventaId, {
      estado: "anulada",
      anuladaPorUsuarioId: usuarioId,
      fechaAnulacion: new Date(),
      motivoAnulacion: motivo.trim(),
    });
    return await this.consultar.obtener(ventaId);
  }
}
