import { Inject, Injectable } from '@nestjs/common';
import { Evidencia } from '../../../domain/entities/evidencia.entity';
import type { EvidenciaRepositoryPort } from '../../../domain/ports/evidencia.repository.port';
import { EVIDENCIA_REPOSITORY } from '../../../domain/ports/evidencia.repository.port';

@Injectable()
export class ListarEvidenciasPorActividadUseCase {
  constructor(
    @Inject(EVIDENCIA_REPOSITORY)
    private readonly repo: EvidenciaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<Evidencia[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}