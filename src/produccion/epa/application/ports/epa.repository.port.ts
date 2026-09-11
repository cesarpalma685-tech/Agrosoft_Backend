import { Epa } from "../../domain/entities/epa.entity";

export abstract class EpaRepositoryPort {
  abstract save(epa: Epa): Promise<Epa>;
  abstract findAll(): Promise<Epa[]>;
  abstract findById(id: number): Promise<Epa | null>;
  abstract asociarTiposCultivo(
    epaId: number,
    tipoCultivoWikiIds: number[],
  ): Promise<void>;
}
