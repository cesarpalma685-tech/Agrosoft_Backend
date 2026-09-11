import { LoteDto } from "../../domain/entities/lote.dto";

export abstract class LoteRepositoryPort {
  abstract save(lote: LoteDto): Promise<LoteDto>;

  abstract findById(id: number): Promise<LoteDto | null>;

  abstract findAll(): Promise<LoteDto[]>;

  abstract update(id: number, lote: Partial<LoteDto>): Promise<LoteDto | null>;

  abstract softDelete(id: number): Promise<void>;
}
