import { LoteProduccion } from './lote-produccion.entity';

export interface LoteProduccionRepository {
  save(loteProduccion: LoteProduccion): Promise<LoteProduccion>;
  findAll(): Promise<LoteProduccion[]>;
  findById(id: number): Promise<LoteProduccion | null>;
}

export const LOTE_PRODUCCION_REPOSITORY = Symbol('LOTE_PRODUCCION_REPOSITORY');