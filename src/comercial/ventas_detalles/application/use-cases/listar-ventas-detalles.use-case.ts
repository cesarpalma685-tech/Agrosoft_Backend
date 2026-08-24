import { Injectable } from '@nestjs/common';
import { VentaDetalleRepositoryPort } from '../ports/venta-detalle.repository.port';
import { VentaDetalle } from '../../domain/entities/venta-detalle.entity';

@Injectable()
export class ListarVentasDetallesUseCase {
  constructor(
    private readonly ventadetallerepository: VentaDetalleRepositoryPort,
  ) {}

    async execute(): Promise<VentaDetalle[]> {
    return await this.ventadetallerepository.findAll();
    }
}