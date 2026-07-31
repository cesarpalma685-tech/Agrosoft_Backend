import { Injectable, NotFoundException } from '@nestjs/common';
import { VentaDetalleRepositoryPort } from '../ports/venta-detalle.repository.port';

@Injectable()
export class EliminarVentaDetalleUseCase {
  constructor(
    private readonly repository: VentaDetalleRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El detalle de venta con ID ${id} no existe`);
    }
    await this.repository.softDelete(id);
  }
}