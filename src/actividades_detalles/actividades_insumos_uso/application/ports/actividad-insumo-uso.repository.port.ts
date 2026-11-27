import { ActividadInsumoUso } from "../../domain/entities/actividad-insumo-uso.entity";

export abstract class ActividadInsumoUsoRepositoryPort {
  abstract save(uso: ActividadInsumoUso): Promise<ActividadInsumoUso>;
  abstract findAll(): Promise<ActividadInsumoUso[]>;
  abstract findByActividadIds(ids: number[]): Promise<ActividadInsumoUso[]>;
}
