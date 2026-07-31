import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TipoCultivoWikiRepository } from '../../domain/tipo-cultivo-wiki-repository.port';
import { TipoCultivoWiki } from '../../domain/tipo-cultivo-wiki.entity';
import { TipoCultivoWikiOrmEntity } from './tipo-cultivo-wiki.orm-entity';

@Injectable()
export class TipoCultivoWikiTypeOrmRepository implements TipoCultivoWikiRepository {
  constructor(
    @InjectRepository(TipoCultivoWikiOrmEntity)
    private readonly ormRepo: Repository<TipoCultivoWikiOrmEntity>,
  ) {}

  async save(tipoCultivoWiki: TipoCultivoWiki): Promise<TipoCultivoWiki> {
    const saved = await this.ormRepo.save({
      nombre: tipoCultivoWiki.nombre,
      descripcion: tipoCultivoWiki.descripcion,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<TipoCultivoWiki[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<TipoCultivoWiki | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: TipoCultivoWikiOrmEntity): TipoCultivoWiki {
    return TipoCultivoWiki.create({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
    });
  }
}