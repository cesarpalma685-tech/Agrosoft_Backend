import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { WikiTipoEpaOrmEntity } from '../persistence/wiki-tipo-epa.orm-entity';
import { WikiTipoEpaRepositoryPort } from '../../application/ports/wiki-tipo-epa.repository.port';
import { WikiTipoEpa } from '../../domain/entities/wiki-tipo-epa.entity';

@Injectable()
export class WikiTipoEpaTypeOrmRepository extends WikiTipoEpaRepositoryPort {
  constructor(
    @InjectRepository(WikiTipoEpaOrmEntity)
    private readonly repository: Repository<WikiTipoEpaOrmEntity>,
  ) {
    super();
  }

  async save(wikiTipoEpa: WikiTipoEpa): Promise<WikiTipoEpa> {
    const entity = this.repository.create(wikiTipoEpa as Partial<WikiTipoEpaOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as WikiTipoEpa;
  }

  async findAll(): Promise<WikiTipoEpa[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as WikiTipoEpa[];
  }

  async findById(id: number): Promise<WikiTipoEpa | null> {
    const row = await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
    return row as unknown as WikiTipoEpa | null;
  }
}