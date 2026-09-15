import { MovimientoInsumo } from "../../domain/entities/movimiento-insumo.entity";

export abstract class MovimientoInsumoRepositoryPort {
  abstract save(movimiento: MovimientoInsumo): Promise<MovimientoInsumo>;
  abstract findById(id: number): Promise<MovimientoInsumo | null>;
  abstract findAll(): Promise<MovimientoInsumo[]>;
  abstract findByInsumoId(insumoId: number): Promise<MovimientoInsumo[]>;
  abstract update(
    id: number,
    movimiento: Partial<MovimientoInsumo>,
  ): Promise<MovimientoInsumo>;
  abstract softDelete(id: number): Promise<void>;
}
