import { Inject, Injectable } from '@nestjs/common';
import { Responsable } from '../../../domain/entities/responsable.entity';
import type { ResponsableRepositoryPort } from '../../../domain/ports/responsable.repository.port';
import { RESPONSABLE_REPOSITORY } from '../../../domain/ports/responsable.repository.port';

@Injectable()
export class ListarResponsablesPorActividadUseCase {
  constructor(
    @Inject(RESPONSABLE_REPOSITORY)
    private readonly repo: ResponsableRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<Responsable[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}