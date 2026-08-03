import { MovimientoProduccion } from './movimiento-produccion.entity';

export interface MovimientoProduccionRepository {
  save(movimientoProduccion: MovimientoProduccion): Promise<MovimientoProduccion>;
  findAll(): Promise<MovimientoProduccion[]>;
  findById(id: number): Promise<MovimientoProduccion | null>;
  getStockDisponible(loteProduccionId: number): Promise<number | null>;
  descontarStock(loteProduccionId: number, cantidadKg: number): Promise<void>;
}

export const MOVIMIENTO_PRODUCCION_REPOSITORY = Symbol('MOVIMIENTO_PRODUCCION_REPOSITORY');