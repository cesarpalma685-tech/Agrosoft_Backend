import { Injectable, NotFoundException } from '@nestjs/common';
import { VentaDetalleRepositoryPort } from '../ports/venta-detalle.repository.port';
import { VentaDetalle } from '../../domain/entities/venta-detalle.entity';

@Injectable()
export class ObtenerVentaDetallePorIdUseCase {
  constructor(
    private readonly repository: VentaDetalleRepositoryPort,
  ) {}

  async execute(id: number): Promise<VentaDetalle> {
    const detalle = await this.repository.findById(id);
    if (!detalle) {
      throw new NotFoundException(`El detalle de venta con ID ${id} no fue encontrado`);
    }
    return detalle;
  }
}