import { ActividadResponsable } from '../../domain/entities/actividad_responsable.entity';

export abstract class ActividadResponsableRepositoryPort {
  abstract save(
    responsable: ActividadResponsable,
  ): Promise<ActividadResponsable>;
  abstract findAll(): Promise<ActividadResponsable[]>;
}
