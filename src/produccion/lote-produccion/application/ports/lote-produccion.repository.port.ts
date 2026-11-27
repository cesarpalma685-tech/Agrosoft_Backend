import { LoteProduccion } from "../../domain/entities/lote-produccion.entity";

export abstract class LoteProduccionRepositoryPort {
  abstract save(loteProduccion: LoteProduccion): Promise<LoteProduccion>;
  abstract findAll(): Promise<LoteProduccion[]>;
  abstract findById(id: number): Promise<LoteProduccion | null>;
  abstract findByCultivoId(cultivoId: number): Promise<LoteProduccion[]>;
  abstract update(id: number, cambios: Partial<LoteProduccion>): Promise<LoteProduccion | null>;
  abstract softDelete(id: number): Promise<void>;
}
