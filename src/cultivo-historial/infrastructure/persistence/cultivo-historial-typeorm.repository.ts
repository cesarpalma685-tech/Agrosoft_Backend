import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CultivoHistorialRepository } from '../../domain/cultivo-historial-repository.port';
import { CultivoHistorial } from '../../domain/cultivo-historial.entity';
import { CultivoHistorialOrmEntity } from './cultivo-historial.orm-entity';

@Injectable()
export class CultivoHistorialTypeOrmRepository implements CultivoHistorialRepository {
  constructor(
    @InjectRepository(CultivoHistorialOrmEntity)
    private readonly ormRepo: Repository<CultivoHistorialOrmEntity>,
  ) {}

  async save(cultivoHistorial: CultivoHistorial): Promise<CultivoHistorial> {
    const saved = await this.ormRepo.save({
      cultivoId: cultivoHistorial.cultivoId,
      usuarioId: cultivoHistorial.usuarioId,
      motivo: cultivoHistorial.motivo,
      cambios: cultivoHistorial.cambios,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<CultivoHistorial[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findByCultivoId(cultivoId: number): Promise<CultivoHistorial[]> {
    const rows = await this.ormRepo.find({ where: { cultivoId, deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  private toDomain(row: CultivoHistorialOrmEntity): CultivoHistorial {
    return CultivoHistorial.create({
      id: row.id,
      cultivoId: row.cultivoId,
      usuarioId: row.usuarioId,
      motivo: row.motivo,
      cambios: row.cambios,
    });
  }
}