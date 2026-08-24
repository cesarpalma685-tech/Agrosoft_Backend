import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';

export abstract class TipoCultivoWikiRepositoryPort {
  abstract save(tipoCultivoWiki: TipoCultivoWiki): Promise<TipoCultivoWiki>;
  abstract findAll(): Promise<TipoCultivoWiki[]>;
  abstract findById(id: number): Promise<TipoCultivoWiki | null>;
}