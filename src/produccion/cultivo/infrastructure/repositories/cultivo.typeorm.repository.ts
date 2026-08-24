import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CultivoOrmEntity } from '../persistence/cultivo.orm-entity';
import { CultivoRepositoryPort } from '../../application/ports/cultivo.repository.port';
import { Cultivo } from '../../domain/entities/cultivo.entity';

@Injectable()
export class CultivoTypeOrmRepository extends CultivoRepositoryPort {
  constructor(
    @InjectRepository(CultivoOrmEntity)
    private readonly repository: Repository<CultivoOrmEntity>,
  ) {
    super();
  }

  async save(cultivo: Cultivo): Promise<Cultivo> {
    const entity = this.repository.create({
      ...cultivo,
      costoTotal: cultivo.costoTotal != null ? cultivo.costoTotal.toFixed(2) : undefined,
    } as Partial<CultivoOrmEntity>);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Cultivo[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows.map((r) => this.toDomain(r));
  }

  async findById(id: number): Promise<Cultivo | null> {
    const row = await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: CultivoOrmEntity): Cultivo {
    return { ...row, costoTotal: parseFloat(row.costoTotal) } as unknown as Cultivo;
  }
}