import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TipoCultivoWikiOrmEntity } from '../persistence/tipo-cultivo-wiki.orm-entity';
import { TipoCultivoWikiRepositoryPort } from '../../application/ports/tipo-cultivo-wiki.repository.port';
import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';

@Injectable()
export class TipoCultivoWikiTypeOrmRepository extends TipoCultivoWikiRepositoryPort {
  constructor(
    @InjectRepository(TipoCultivoWikiOrmEntity)
    private readonly repository: Repository<TipoCultivoWikiOrmEntity>,
  ) {
    super();
  }

  async save(tipoCultivoWiki: TipoCultivoWiki): Promise<TipoCultivoWiki> {
    const entity = this.repository.create(tipoCultivoWiki as Partial<TipoCultivoWikiOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as TipoCultivoWiki;
  }

  async findAll(): Promise<TipoCultivoWiki[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as TipoCultivoWiki[];
  }

  async findById(id: number): Promise<TipoCultivoWiki | null> {
    const row = await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
    return row as unknown as TipoCultivoWiki | null;
  }
}