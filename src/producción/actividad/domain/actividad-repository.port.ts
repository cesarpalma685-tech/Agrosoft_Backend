import { Actividad } from './actividad.entity';

export interface ActividadRepository {
  save(actividad: Actividad): Promise<Actividad>;
  findAll(): Promise<Actividad[]>;
  findById(id: number): Promise<Actividad | null>;
}

export const ACTIVIDAD_REPOSITORY = Symbol('ACTIVIDAD_REPOSITORY');