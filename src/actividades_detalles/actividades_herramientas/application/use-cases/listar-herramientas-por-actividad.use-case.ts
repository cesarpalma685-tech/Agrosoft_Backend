import { Injectable } from '@nestjs/common';
import { ActividadHerramientaRepositoryPort } from '../ports/actividad-herramienta.repository.port';
import { ActividadHerramienta } from '../../domain/entities/actividad-herramienta.entity';

@Injectable()
export class ListarHerramientasPorActividadUseCase {
  constructor(
    private readonly actividadHerramientaRepository: ActividadHerramientaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ActividadHerramienta[]> {
    return await this.actividadHerramientaRepository.findByActividadId(actividadId);
  }
}
