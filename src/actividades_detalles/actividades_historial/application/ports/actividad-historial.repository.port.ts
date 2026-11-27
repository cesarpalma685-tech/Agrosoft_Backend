import { ActividadHistorial } from "../../domain/entities/actividad-historial.entity";

export type HistorialConNombre = ActividadHistorial & { usuarioNombre: string };

export abstract class ActividadHistorialRepositoryPort {
  abstract save(historial: ActividadHistorial): Promise<ActividadHistorial>;
  abstract findAll(): Promise<ActividadHistorial[]>;
  abstract findByActividadIds(ids: number[]): Promise<HistorialConNombre[]>;
}
