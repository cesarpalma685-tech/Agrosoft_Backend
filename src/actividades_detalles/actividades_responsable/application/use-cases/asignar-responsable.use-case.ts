import { Injectable } from '@nestjs/common';
import { ActividadResponsableRepositoryPort } from '../ports/actividad-responsable.repository.port';
import { AsignarActividadResponsableDto } from '../dto/actividad_responsable.dto';
import { ActividadResponsable } from '../../domain/entities/actividad_responsable.entity';


@Injectable()
export class AsignarResponsableUseCase {
  constructor(
    private readonly actividadResponsableRepository: ActividadResponsableRepositoryPort,
  ) {}

  async execute(dto: AsignarActividadResponsableDto): Promise<ActividadResponsable> {
    const nuevoResponsable = new ActividadResponsable();
    Object.assign(nuevoResponsable, dto);
    return await this.actividadResponsableRepository.save(nuevoResponsable);
  }
}
