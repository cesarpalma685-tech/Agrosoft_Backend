import { Epa } from './epa.entity';

export interface EpaRepository {
  save(epa: Epa): Promise<Epa>;
  findAll(): Promise<Epa[]>;
  findById(id: number): Promise<Epa | null>;
  asociarTiposCultivo(epaId: number, tipoCultivoWikiIds: number[]): Promise<void>;
}

export const EPA_REPOSITORY = Symbol('EPA_REPOSITORY');