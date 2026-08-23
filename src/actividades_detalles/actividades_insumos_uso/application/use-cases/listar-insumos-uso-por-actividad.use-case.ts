import { Injectable } from '@nestjs/common';
import { ActividadInsumoUsoRepositoryPort } from '../ports/actividad-insumo-uso.repository.port';
import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';

@Injectable()
export class ListarInsumosUsoPorActividadUseCase {
  constructor(
    private readonly actividadInsumoUsoRepository: ActividadInsumoUsoRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ActividadInsumoUso[]> {
    return await this.actividadInsumoUsoRepository.findByActividadId(actividadId);
  }
}
