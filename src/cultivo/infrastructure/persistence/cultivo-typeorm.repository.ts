import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CultivoRepository } from '../../domain/cultivo-repository.port';
import { Cultivo } from '../../domain/cultivo.entity';
import { CultivoOrmEntity } from './cultivo.orm-entity';

@Injectable()
export class CultivoTypeOrmRepository implements CultivoRepository {
  constructor(
    @InjectRepository(CultivoOrmEntity)
    private readonly ormRepo: Repository<CultivoOrmEntity>,
  ) {}

  async save(cultivo: Cultivo): Promise<Cultivo> {
    const saved = await this.ormRepo.save({
      nombreCultivo: cultivo.nombreCultivo,
      tipoCultivo: cultivo.tipoCultivo,
      descripcion: cultivo.descripcion,
      loteId: cultivo.loteId,
      subloteId: cultivo.subloteId,
      imgCultivo: cultivo.imgCultivo,
      fechaSiembra: cultivo.fechaSiembra,
      fechaFinalizacion: cultivo.fechaFinalizacion,
      costoTotal: cultivo.costoTotal.toFixed(2),
      estado: cultivo.estado,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<Cultivo[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<Cultivo | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: CultivoOrmEntity): Cultivo {
    return Cultivo.create({
      id: row.id,
      nombreCultivo: row.nombreCultivo,
      tipoCultivo: row.tipoCultivo,
      descripcion: row.descripcion,
      loteId: row.loteId,
      subloteId: row.subloteId,
      imgCultivo: row.imgCultivo,
      fechaSiembra: row.fechaSiembra,
      fechaFinalizacion: row.fechaFinalizacion,
      costoTotal: parseFloat(row.costoTotal),
      estado: row.estado,
    });
  }
}