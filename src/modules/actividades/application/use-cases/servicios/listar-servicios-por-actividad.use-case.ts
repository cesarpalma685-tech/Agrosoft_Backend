import { Inject, Injectable } from '@nestjs/common';
import { Servicio } from '../../../domain/entities/servicio.entity';
import type { ServicioRepositoryPort } from '../../../domain/ports/servicio.repository.port';
import { SERVICIO_REPOSITORY } from '../../../domain/ports/servicio.repository.port';

@Injectable()
export class ListarServiciosPorActividadUseCase {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly repo: ServicioRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<Servicio[]> {
    return this.repo.listarPorActividad(actividadId);
  }
}