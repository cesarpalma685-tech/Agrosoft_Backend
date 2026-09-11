import { Actividad } from "../../domain/entities/actividad.entity";

export abstract class ActividadRepositoryPort {
  abstract save(actividad: Actividad): Promise<Actividad>;
  abstract findAll(): Promise<Actividad[]>;
  abstract findById(id: number): Promise<Actividad | null>;
}
