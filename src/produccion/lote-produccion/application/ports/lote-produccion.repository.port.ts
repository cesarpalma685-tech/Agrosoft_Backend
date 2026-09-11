import { LoteProduccion } from "../../domain/entities/lote-produccion.entity";

export abstract class LoteProduccionRepositoryPort {
  abstract save(loteProduccion: LoteProduccion): Promise<LoteProduccion>;
  abstract findAll(): Promise<LoteProduccion[]>;
  abstract findById(id: number): Promise<LoteProduccion | null>;
}
