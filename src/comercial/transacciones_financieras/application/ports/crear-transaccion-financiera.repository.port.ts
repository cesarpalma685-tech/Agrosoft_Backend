import { TransaccionFinanciera } from "../../domain/entities/transaccion-financiera.entity";

export abstract class TransaccionFinancieraRepositoryPort {
  abstract save(
    transaccion: TransaccionFinanciera,
  ): Promise<TransaccionFinanciera>;
  abstract findById(id: number): Promise<TransaccionFinanciera | null>;
  abstract findAll(): Promise<TransaccionFinanciera[]>;
  abstract findByVentaId(ventaId: number): Promise<TransaccionFinanciera[]>;
  abstract update(
    id: number,
    transaccion: Partial<TransaccionFinanciera>,
  ): Promise<TransaccionFinanciera>;
  abstract softDelete(id: number): Promise<void>;
}
