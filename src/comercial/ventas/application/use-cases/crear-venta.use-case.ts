import { Injectable } from '@nestjs/common';
import { VentaRepositoryPort } from '../ports/venta.repository.ports';
import { CrearVentaDto } from '../dto/crear-venta.dto';
import { Venta } from '../../domain/entities/crear-venta.entity';

@Injectable()
export class CrearVentaUseCase {
  constructor(
    private readonly ventaRepository: VentaRepositoryPort,
  ) {}

  async execute(dto: CrearVentaDto): Promise<Venta> {
    const nuevaVenta = new Venta();
    Object.assign(nuevaVenta, dto);

    if (dto.fecha) {
      nuevaVenta.fecha = new Date(dto.fecha);
    }
    if (dto.fechaAnulacion) {
      nuevaVenta.fechaAnulacion = new Date(dto.fechaAnulacion);
    }

    return await this.ventaRepository.save(nuevaVenta);
  }
}