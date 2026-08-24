import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearVentaDto } from '../dto/crear-venta.dto';
import { VentaRepositoryPort } from '../ports/venta.repository.ports';
import { Venta } from '../../domain/entities/crear-venta.entity';

@Injectable()
export class ActualizarVentaUseCase {
  constructor(
    private readonly ventaRepository: VentaRepositoryPort,
  ) {}

  async execute(id: number, dto: Partial<CrearVentaDto>): Promise<Venta> {
    const existe = await this.ventaRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`La venta con ID ${id} no existe`);
    }

    const payload: Partial<Venta> = { ...dto } as any;
    if (dto.fecha) {
      payload.fecha = new Date(dto.fecha);
    }
    if (dto.fechaAnulacion) {
      payload.fechaAnulacion = new Date(dto.fechaAnulacion);
    }

    return await this.ventaRepository.update(id, payload);
  }
}