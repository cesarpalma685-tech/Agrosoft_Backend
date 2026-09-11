import { Sublote } from "../../domain/entities/sublote.dto";

export abstract class SubloteRepositoryPort {
  abstract save(sublote: Sublote): Promise<Sublote>;

  abstract findById(id: number): Promise<Sublote | null>;

  abstract findAll(): Promise<Sublote[]>;

  abstract update(
    id: number,
    sublote: Partial<Sublote>,
  ): Promise<Sublote | null>;

  abstract softDelete(id: number): Promise<void>;
}
