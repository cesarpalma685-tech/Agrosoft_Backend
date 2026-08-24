import { Injectable } from '@nestjs/common';
import { ActividadServicioRepositoryPort } from '../ports/actividad-servicio.repository.port';
import { ActividadServicio } from '../../domain/entities/actividad-servicio.entity';
import { ContratarActividadServicioDto } from '../dto/actividad_servicio.dto';

@Injectable()
export class ContratarServicioUseCase {
  constructor(
    private readonly actividadServicioRepository: ActividadServicioRepositoryPort,
  ) {}

  async execute(dto: ContratarActividadServicioDto): Promise<ActividadServicio> {
    const nuevoServicio = new ActividadServicio();
    Object.assign(nuevoServicio, dto);
    return await this.actividadServicioRepository.save(nuevoServicio);
  }
}
