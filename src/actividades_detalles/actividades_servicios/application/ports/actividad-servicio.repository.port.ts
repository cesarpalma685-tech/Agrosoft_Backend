import { ActividadServicio } from '../../domain/entities/actividad-servicio.entity';

export abstract class ActividadServicioRepositoryPort {
  abstract save(servicio: ActividadServicio): Promise<ActividadServicio>;

  abstract findByActividadId(actividadId: number): Promise<ActividadServicio[]>;
}
