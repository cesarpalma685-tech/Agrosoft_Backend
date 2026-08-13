import { Inject, Injectable } from '@nestjs/common';
import { UsoInsumo } from '../../../domain/entities/uso-insumo.entity';
import type { UsoInsumoRepositoryPort } from '../../../domain/ports/uso-insumo.repository.port';
import { USO_INSUMO_REPOSITORY } from '../../../domain/ports/uso-insumo.repository.port';

@Injectable()
export class ListarUsosInsumoPorActividadUseCase {
  constructor(
    @Inject(USO_INSUMO_REPOSITORY)
    private readonly repo: UsoInsumoRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<UsoInsumo[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}