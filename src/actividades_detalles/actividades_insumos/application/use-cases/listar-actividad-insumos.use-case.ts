import { Injectable } from '@nestjs/common';
import { ActividadInsumoRepositoryPort } from '../ports/actividad-insumo.repository.port';
import { ActividadInsumo } from '../../domain/entities/actividad-insumo.entity';

@Injectable()
export class ListarActividadInsumosUseCase {
  constructor(
    private readonly actividadInsumoRepository: ActividadInsumoRepositoryPort,
  ) {}

  async execute(): Promise<ActividadInsumo[]> {
    return await this.actividadInsumoRepository.findAll();
  }
}
