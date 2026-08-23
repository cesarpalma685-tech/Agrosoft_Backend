import { ActividadHistorial } from '../../domain/entities/actividad-historial.entity';

export abstract class ActividadHistorialRepositoryPort {
  abstract save(historial: ActividadHistorial): Promise<ActividadHistorial>;

  abstract findAll(): Promise<ActividadHistorial[]>;
}
