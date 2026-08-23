import { Injectable } from '@nestjs/common';
import { ActividadEvidenciaRepositoryPort } from '../ports/actividad-evidencia.repository.port';
import { ActividadEvidencia } from '../../domain/entities/actividad_evidencia.entity';

@Injectable()
export class ListarEvidenciasPorActividadUseCase {
  constructor(
    private readonly actividadEvidenciaRepository: ActividadEvidenciaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ActividadEvidencia[]> {
    return await this.actividadEvidenciaRepository.findByActividadId(actividadId);
  }
}
