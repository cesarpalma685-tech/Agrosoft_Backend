import { Inject, Injectable } from '@nestjs/common';
import { Actividad } from '../domain/actividad.entity';
import type { ActividadRepository } from '../domain/actividad-repository.port';
import { ACTIVIDAD_REPOSITORY } from '../domain/actividad-repository.port';

@Injectable()
export class ListActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepository,
  ) {}

  async execute(): Promise<Actividad[]> {
    return this.actividadRepository.findAll();
  }
}