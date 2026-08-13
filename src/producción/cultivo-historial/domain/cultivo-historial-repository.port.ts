import { CultivoHistorial } from './cultivo-historial.entity';

export interface CultivoHistorialRepository {
  save(cultivoHistorial: CultivoHistorial): Promise<CultivoHistorial>;
  findAll(): Promise<CultivoHistorial[]>;
  findByCultivoId(cultivoId: number): Promise<CultivoHistorial[]>;
}

export const CULTIVO_HISTORIAL_REPOSITORY = Symbol('CULTIVO_HISTORIAL_REPOSITORY');