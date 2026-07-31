import { Venta } from "../../domain/entities/crear-venta.entity";


export abstract class VentaRepositoryPort {
  abstract save(venta: Venta): Promise<Venta>;
  abstract findById(id: number): Promise<Venta | null>;
  abstract findAll(): Promise<Venta[]>;
  abstract update(id: number, venta: Partial<Venta>): Promise<Venta>;
  abstract softDelete(id: number): Promise<void>;
}