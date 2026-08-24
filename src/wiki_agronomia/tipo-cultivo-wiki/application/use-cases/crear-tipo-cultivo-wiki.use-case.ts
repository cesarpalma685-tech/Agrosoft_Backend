import { Injectable } from '@nestjs/common';
import { TipoCultivoWikiRepositoryPort } from '../ports/tipo-cultivo-wiki.repository.port';
import { CrearTipoCultivoWikiDto } from '../dto/crear-tipo-cultivo-wiki.dto';
import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';

@Injectable()
export class CrearTipoCultivoWikiUseCase {
  constructor(private readonly tipoCultivoWikiRepository: TipoCultivoWikiRepositoryPort) {}

  async execute(dto: CrearTipoCultivoWikiDto): Promise<TipoCultivoWiki> {
    const nuevo = new TipoCultivoWiki();
    Object.assign(nuevo, dto);
    return await this.tipoCultivoWikiRepository.save(nuevo);
  }
}