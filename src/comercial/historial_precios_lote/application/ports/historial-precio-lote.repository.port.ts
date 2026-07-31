import { HistorialPrecioLote } from '../../domain/entities/historial-precio-lote.entity';

export abstract class HistorialPrecioLoteRepositoryPort {
  abstract save(historial: HistorialPrecioLote): Promise<HistorialPrecioLote>;
  abstract findById(id: number): Promise<HistorialPrecioLote | null>;
  abstract findAll(): Promise<HistorialPrecioLote[]>;
  abstract findByLoteProduccionId(loteProduccionId: number): Promise<HistorialPrecioLote[]>;
  abstract update(id: number, historial: Partial<HistorialPrecioLote>): Promise<HistorialPrecioLote>;
  abstract softDelete(id: number): Promise<void>;
}