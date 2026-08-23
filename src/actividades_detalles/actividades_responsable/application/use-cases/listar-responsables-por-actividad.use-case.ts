import { Injectable } from '@nestjs/common';
import { ActividadResponsableRepositoryPort } from '../ports/actividad-responsable.repository.port';
import { ActividadResponsable } from '../../domain/entities/actividad_responsable.entity';

@Injectable()
export class ListarResponsablesPorActividadUseCase {
  constructor(
    private readonly actividadResponsableRepository: ActividadResponsableRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ActividadResponsable[]> {
    return await this.actividadResponsableRepository.findByActividadId(actividadId);
  }
}