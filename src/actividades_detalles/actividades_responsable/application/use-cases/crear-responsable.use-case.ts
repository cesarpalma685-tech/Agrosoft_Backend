import { Injectable } from '@nestjs/common';
import { ActividadResponsableRepositoryPort } from '../ports/actividad-responsable.repository.port';
import { ActividadResponsable } from '../../domain/entities/actividad_responsable.entity';
import { CrearActividadResponsableDto } from '../dto/actividad_responsable.dto';

@Injectable()
export class CrearActividadResponsableUseCase {
  constructor(
    private readonly actividadResponsableRepository: ActividadResponsableRepositoryPort,
  ) {}

  async execute(
    dto: CrearActividadResponsableDto,
  ): Promise<ActividadResponsable> {
    const nuevoResponsable = new ActividadResponsable();
    Object.assign(nuevoResponsable, dto);
    nuevoResponsable.costo = dto.horas * dto.precioHora;
    return await this.actividadResponsableRepository.save(nuevoResponsable);
  }
}
