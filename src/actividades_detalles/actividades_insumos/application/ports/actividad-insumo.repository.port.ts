import { ActividadInsumo } from '../../domain/entities/actividad-insumo.entity';

export abstract class ActividadInsumoRepositoryPort {
  abstract save(insumo: ActividadInsumo): Promise<ActividadInsumo>;
  abstract findAll(): Promise<ActividadInsumo[]>;
}
