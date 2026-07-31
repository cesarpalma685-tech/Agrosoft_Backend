import { Injectable } from '@nestjs/common';
import { HistorialPrecioLoteRepositoryPort } from '../ports/historial-precio-lote.repository.port';
import { CrearHistorialPrecioLoteDto } from '../dto/crear-historial-precio-lote.dto';
import { HistorialPrecioLote } from '../../domain/entities/historial-precio-lote.entity';

@Injectable()
export class CrearHistorialPrecioLoteUseCase {
  constructor(
    private readonly repository: HistorialPrecioLoteRepositoryPort,
  ) {}

  async execute(dto: CrearHistorialPrecioLoteDto): Promise<HistorialPrecioLote> {
    const nuevoHistorial = new HistorialPrecioLote();
    Object.assign(nuevoHistorial, dto);

    if (dto.fecha) {
      nuevoHistorial.fecha = new Date(dto.fecha);
    }

    return await this.repository.save(nuevoHistorial);
  }
}