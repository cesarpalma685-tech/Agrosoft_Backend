import { Inject, Injectable } from '@nestjs/common';
import { ReservaInsumo } from '../../../domain/entities/reserva-insumo.entity';
import type { ReservaInsumoRepositoryPort } from '../../../domain/ports/reserva-insumo.repository.port';
import { RESERVA_INSUMO_REPOSITORY } from '../../../domain/ports/reserva-insumo.repository.port';

@Injectable()
export class ListarReservasPorActividadUseCase {
  constructor(
    @Inject(RESERVA_INSUMO_REPOSITORY)
    private readonly repo: ReservaInsumoRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ReservaInsumo[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}