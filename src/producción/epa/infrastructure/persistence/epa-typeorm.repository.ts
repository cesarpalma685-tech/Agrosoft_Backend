import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { EpaRepository } from '../../domain/epa-repository.port';
import { Epa } from '../../domain/epa.entity';
import { EpaOrmEntity } from './epa.orm-entity';
import { TipoCultivoWikiOrmEntity } from '../../../../wiki-agronómia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity';

@Injectable()
export class EpaTypeOrmRepository implements EpaRepository {
  constructor(
    @InjectRepository(EpaOrmEntity)
    private readonly ormRepo: Repository<EpaOrmEntity>,
    @InjectRepository(TipoCultivoWikiOrmEntity)
    private readonly tipoCultivoWikiOrmRepo: Repository<TipoCultivoWikiOrmEntity>,
  ) {}

  async save(epa: Epa): Promise<Epa> {
    const saved = await this.ormRepo.save({
      nombre: epa.nombre,
      tipoEpa: epa.tipoEpa,
      descripcion: epa.descripcion,
      sintomas: epa.sintomas,
      manejoYControl: epa.manejoYControl,
      mesesProbables: epa.mesesProbables,
      temporadas: epa.temporadas,
      notasEstacionalidad: epa.notasEstacionalidad,
      fotosSintomas: epa.fotosSintomas,
      fotosGenerales: epa.fotosGenerales,
      tags: epa.tags,
      creadoPorUsuarioId: epa.creadoPorUsuarioId,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<Epa[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<Epa | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  async asociarTiposCultivo(epaId: number, tipoCultivoWikiIds: number[]): Promise<void> {
    const epa = await this.ormRepo.findOne({
     where: { id: epaId },
     relations: { tiposCultivosWiki: true },
    });
    if (!epa) {
      throw new Error('EPA no encontrada');
    }
    const tiposCultivo = await this.tipoCultivoWikiOrmRepo.find({
      where: { id: In(tipoCultivoWikiIds) },
    });
    epa.tiposCultivosWiki = tiposCultivo;
    await this.ormRepo.save(epa);
  }

  private toDomain(row: EpaOrmEntity): Epa {
    return Epa.create({
      id: row.id,
      nombre: row.nombre,
      tipoEpa: row.tipoEpa,
      descripcion: row.descripcion,
      sintomas: row.sintomas,
      manejoYControl: row.manejoYControl,
      mesesProbables: row.mesesProbables,
      temporadas: row.temporadas,
      notasEstacionalidad: row.notasEstacionalidad,
      fotosSintomas: row.fotosSintomas,
      fotosGenerales: row.fotosGenerales,
      tags: row.tags,
      creadoPorUsuarioId: row.creadoPorUsuarioId,
    });
  }
}