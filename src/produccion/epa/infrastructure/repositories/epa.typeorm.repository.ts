import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { EpaOrmEntity } from '../persistence/epa.orm-entity';
import { TipoCultivoWikiOrmEntity } from '../../../../wiki_agronomia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity';
import { EpaRepositoryPort } from '../../application/ports/epa.repository.port';
import { Epa } from '../../domain/entities/epa.entity';

@Injectable()
export class EpaTypeOrmRepository extends EpaRepositoryPort {
  constructor(
    @InjectRepository(EpaOrmEntity)
    private readonly repository: Repository<EpaOrmEntity>,
    @InjectRepository(TipoCultivoWikiOrmEntity)
    private readonly tipoCultivoWikiRepository: Repository<TipoCultivoWikiOrmEntity>,
  ) {
    super();
  }

  async save(epa: Epa): Promise<Epa> {
    const entity = this.repository.create(epa as Partial<EpaOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as Epa;
  }

  async findAll(): Promise<Epa[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as Epa[];
  }

  async findById(id: number): Promise<Epa | null> {
    const row = await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
    return row as unknown as Epa | null;
  }

  async asociarTiposCultivo(epaId: number, tipoCultivoWikiIds: number[]): Promise<void> {
    const epa = await this.repository.findOne({
      where: { id: epaId },
      relations: { tiposCultivosWiki: true },
    });
    if (!epa) {
      throw new Error('EPA no encontrada');
    }
    const tipos = await this.tipoCultivoWikiRepository.find({
      where: { id: In(tipoCultivoWikiIds) },
    });
    epa.tiposCultivosWiki = tipos;
    await this.repository.save(epa);
  }
}