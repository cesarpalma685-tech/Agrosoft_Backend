import { Injectable, NotFoundException } from '@nestjs/common';
import { HistorialPrecioLoteRepositoryPort } from '../ports/historial-precio-lote.repository.port';
import { HistorialPrecioLote } from '../../domain/entities/historial-precio-lote.entity';
import { CrearHistorialPrecioLoteDto } from '../dto/crear-historial-precio-lote.dto';

@Injectable()
export class ActualizarHistorialPrecioLoteUseCase {
  constructor(
    private readonly repository: HistorialPrecioLoteRepositoryPort,
  ) {}

  async execute(id: number, dto: Partial<CrearHistorialPrecioLoteDto>): Promise<HistorialPrecioLote> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El historial de precio con ID ${id} no existe`);
    }

    const payload: Partial<HistorialPrecioLote> = { ...dto } as any;
    if (dto.fecha) {
      payload.fecha = new Date(dto.fecha);
    }

    return await this.repository.update(id, payload);
  }
}