import { WikiTipoEpa } from '../../domain/entities/wiki-tipo-epa.entity';

export abstract class WikiTipoEpaRepositoryPort {
  abstract save(wikiTipoEpa: WikiTipoEpa): Promise<WikiTipoEpa>;
  abstract findAll(): Promise<WikiTipoEpa[]>;
  abstract findById(id: number): Promise<WikiTipoEpa | null>;
}