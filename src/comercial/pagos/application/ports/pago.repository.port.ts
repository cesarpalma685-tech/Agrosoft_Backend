import { Pago } from "../../domain/entities/pago.entity";

export abstract class PagoRepositoryPort {
  abstract save(pago: Pago): Promise<Pago>;
  abstract findById(id: number): Promise<Pago | null>;
  abstract findAll(): Promise<Pago[]>;
  abstract findByVentaId(ventaId: number): Promise<Pago[]>;
  abstract update(id: number, pago: Partial<Pago>): Promise<Pago>;
  abstract softDelete(id: number): Promise<void>;
}
