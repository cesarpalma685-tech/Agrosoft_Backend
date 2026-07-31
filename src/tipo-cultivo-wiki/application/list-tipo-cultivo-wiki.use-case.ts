import { Inject, Injectable } from '@nestjs/common';
import { TipoCultivoWiki } from '../domain/tipo-cultivo-wiki.entity';
import type { TipoCultivoWikiRepository } from '../domain/tipo-cultivo-wiki-repository.port';
import { TIPO_CULTIVO_WIKI_REPOSITORY } from '../domain/tipo-cultivo-wiki-repository.port';

@Injectable()
export class ListTipoCultivoWikiUseCase {
  constructor(
    @Inject(TIPO_CULTIVO_WIKI_REPOSITORY)
    private readonly tipoCultivoWikiRepository: TipoCultivoWikiRepository,
  ) {}

  async execute(): Promise<TipoCultivoWiki[]> {
    return this.tipoCultivoWikiRepository.findAll();
  }
}