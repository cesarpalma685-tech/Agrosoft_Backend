import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';

export abstract class ActividadInsumoUsoRepositoryPort {
  abstract save(insumoUso: ActividadInsumoUso): Promise<ActividadInsumoUso>;

  abstract findByActividadId(actividadId: number): Promise<ActividadInsumoUso[]>;
}