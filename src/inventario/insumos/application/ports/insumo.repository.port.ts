import { Insumo } from "../../domain/entities/crear-insumo.dto";

export abstract class InsumoRepositoryPort {
  abstract save(insumo: Insumo): Promise<Insumo>;
  abstract findById(id: number): Promise<Insumo | null>;
  abstract findAll(): Promise<Insumo[]>;
  abstract update(id: number, insumo: Partial<Insumo>): Promise<Insumo>;
  abstract softDelete(id: number): Promise<void>;
  abstract findByAlmacen(almacenId: number): Promise<Insumo[]>;
}
