import { Inject, Injectable } from '@nestjs/common';
import { UsoHerramienta } from '../../../domain/entities/uso-herramienta.entity';
import type { UsoHerramientaRepositoryPort } from '../../../domain/ports/uso-herramienta.repository.port';
import { USO_HERRAMIENTA_REPOSITORY } from '../../../domain/ports/uso-herramienta.repository.port';

@Injectable()
export class ListarUsosHerramientaPorActividadUseCase {
  constructor(
    @Inject(USO_HERRAMIENTA_REPOSITORY)
    private readonly repo: UsoHerramientaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<UsoHerramienta[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}