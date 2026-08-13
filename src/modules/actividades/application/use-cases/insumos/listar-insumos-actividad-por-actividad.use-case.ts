import { Inject, Injectable } from '@nestjs/common';
import { InsumoActividad } from '../../../domain/entities/insumo-actividad.entity';
import type { InsumoActividadRepositoryPort } from '../../../domain/ports/insumo-actividad.repository.port';
import { INSUMO_ACTIVIDAD_REPOSITORY } from '../../../domain/ports/insumo-actividad.repository.port';

@Injectable()
export class ListarInsumosActividadPorActividadUseCase {
  constructor(
    @Inject(INSUMO_ACTIVIDAD_REPOSITORY)
    private readonly repo: InsumoActividadRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<InsumoActividad[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}