import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { WikiTipoEpaRepository } from '../../domain/wiki-tipo-epa-repository.port';
import { WikiTipoEpa } from '../../domain/wiki-tipo-epa.entity';
import { WikiTipoEpaOrmEntity } from './wiki-tipo-epa.orm-entity';

@Injectable()
export class WikiTipoEpaTypeOrmRepository implements WikiTipoEpaRepository {
  constructor(
    @InjectRepository(WikiTipoEpaOrmEntity)
    private readonly ormRepo: Repository<WikiTipoEpaOrmEntity>,
  ) {}

  async save(wikiTipoEpa: WikiTipoEpa): Promise<WikiTipoEpa> {
    const saved = await this.ormRepo.save({
      nombre: wikiTipoEpa.nombre,
      descripcion: wikiTipoEpa.descripcion,
      tipoEpaEnum: wikiTipoEpa.tipoEpaEnum,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<WikiTipoEpa[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<WikiTipoEpa | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: WikiTipoEpaOrmEntity): WikiTipoEpa {
    return WikiTipoEpa.create({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      tipoEpaEnum: row.tipoEpaEnum,
    });
  }
}