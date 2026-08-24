import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';

export abstract class MovimientoProduccionRepositoryPort {
  abstract save(movimientoProduccion: MovimientoProduccion): Promise<MovimientoProduccion>;
  abstract findAll(): Promise<MovimientoProduccion[]>;
  abstract getStockDisponible(loteProduccionId: number): Promise<number | null>;
  abstract descontarStock(loteProduccionId: number, delta: number): Promise<void>;
}