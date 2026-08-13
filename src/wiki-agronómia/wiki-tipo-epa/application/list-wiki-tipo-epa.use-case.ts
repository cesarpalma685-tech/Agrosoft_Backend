import { Inject, Injectable } from '@nestjs/common';
import { WikiTipoEpa } from '../domain/wiki-tipo-epa.entity';
import type { WikiTipoEpaRepository } from '../domain/wiki-tipo-epa-repository.port';
import { WIKI_TIPO_EPA_REPOSITORY } from '../domain/wiki-tipo-epa-repository.port';

@Injectable()
export class ListWikiTipoEpaUseCase {
  constructor(
    @Inject(WIKI_TIPO_EPA_REPOSITORY)
    private readonly wikiTipoEpaRepository: WikiTipoEpaRepository,
  ) {}

  async execute(): Promise<WikiTipoEpa[]> {
    return this.wikiTipoEpaRepository.findAll();
  }
}