import { Injectable } from '@nestjs/common';
import { TipoCultivoWikiRepositoryPort } from '../ports/tipo-cultivo-wiki.repository.port';
import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';

@Injectable()
export class ListarTipoCultivoWikiUseCase {
  constructor(private readonly tipoCultivoWikiRepository: TipoCultivoWikiRepositoryPort) {}

  async execute(): Promise<TipoCultivoWiki[]> {
    return await this.tipoCultivoWikiRepository.findAll();
  }
}