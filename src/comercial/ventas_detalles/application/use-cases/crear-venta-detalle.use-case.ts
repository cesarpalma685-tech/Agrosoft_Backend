import { Injectable } from '@nestjs/common';
import { VentaDetalleRepositoryPort } from '../ports/venta-detalle.repository.port';
import { CrearVentaDetalleDto } from '../dto/crear-venta-detalle.dto';
import { VentaDetalle } from '../../domain/entities/venta-detalle.entity';

@Injectable()
export class CrearVentaDetalleUseCase {
  constructor(
    private readonly repository: VentaDetalleRepositoryPort,
  ) {}

  async execute(dto: CrearVentaDetalleDto): Promise<VentaDetalle> {
    const nuevoDetalle = new VentaDetalle();
    Object.assign(nuevoDetalle, dto);
    return await this.repository.save(nuevoDetalle);
  }
}