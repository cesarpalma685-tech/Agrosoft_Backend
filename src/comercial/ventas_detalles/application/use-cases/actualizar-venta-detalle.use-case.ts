import { Injectable, NotFoundException } from "@nestjs/common";
import { VentaDetalleRepositoryPort } from "../ports/venta-detalle.repository.port";
import { VentaDetalle } from "../../domain/entities/venta-detalle.entity";
import { CrearVentaDetalleDto } from "../dto/crear-venta-detalle.dto";

@Injectable()
export class ActualizarVentaDetalleUseCase {
  constructor(private readonly repository: VentaDetalleRepositoryPort) {}

  async execute(
    id: number,
    dto: Partial<CrearVentaDetalleDto>,
  ): Promise<VentaDetalle> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El detalle de venta con ID ${id} no existe`);
    }

    return await this.repository.update(id, dto);
  }
}
