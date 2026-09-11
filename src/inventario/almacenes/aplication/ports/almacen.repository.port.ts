import { Almacen } from "../../domain/entities/crear-almacen.dto";

export abstract class AlmacenRepositoryPort {
  abstract save(almacen: Almacen): Promise<Almacen>;
  abstract findById(id: number): Promise<Almacen | null>;
  abstract findAll(): Promise<Almacen[]>;
  abstract update(id: number, almacen: Partial<Almacen>): Promise<Almacen>;
  abstract softDelete(id: number): Promise<void>;
}
