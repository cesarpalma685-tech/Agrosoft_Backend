import { Injectable } from '@nestjs/common';
import { ActividadServicioRepositoryPort } from '../ports/actividad-servicio.repository.port';
import { ActividadServicio } from '../../domain/entities/actividad-servicio.entity';

@Injectable()
export class ListarServiciosPorActividadUseCase {
  constructor(
    private readonly actividadServicioRepository: ActividadServicioRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ActividadServicio[]> {
    return await this.actividadServicioRepository.findByActividadId(actividadId);
  }
}
