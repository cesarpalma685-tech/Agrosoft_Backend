import { Inject, Injectable } from '@nestjs/common';
import { HerramientaAsignada } from '../../../domain/entities/herramienta-asignada.entity';
import type { HerramientaAsignadaRepositoryPort } from '../../../domain/ports/herramienta-asignada.repository.port';
import { HERRAMIENTA_ASIGNADA_REPOSITORY } from '../../../domain/ports/herramienta-asignada.repository.port';

@Injectable()
export class ListarHerramientasPorActividadUseCase {
  constructor(
    @Inject(HERRAMIENTA_ASIGNADA_REPOSITORY)
    private readonly repo: HerramientaAsignadaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<HerramientaAsignada[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}