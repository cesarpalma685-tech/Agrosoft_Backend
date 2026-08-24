import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ActividadOrmEntity } from '../persistence/actividad.orm-entity';
import { ActividadRepositoryPort } from '../../application/ports/actividad.repository.port';
import { Actividad } from '../../domain/entities/actividad.entity';

@Injectable()
export class ActividadTypeOrmRepository extends ActividadRepositoryPort {
  constructor(
    @InjectRepository(ActividadOrmEntity)
    private readonly repository: Repository<ActividadOrmEntity>,
  ) {
    super();
  }

  async save(actividad: Actividad): Promise<Actividad> {
    const entity = this.repository.create(actividad as Partial<ActividadOrmEntity>);
    const saved = await this.repository.save(entity);
    return saved as unknown as Actividad;
  }

  async findAll(): Promise<Actividad[]> {
    const rows = await this.repository.find({ where: { deletedAt: IsNull() } });
    return rows as unknown as Actividad[];
  }

  async findById(id: number): Promise<Actividad | null> {
    const row = await this.repository.findOne({ where: { id, deletedAt: IsNull() } });
    return row as unknown as Actividad | null;
  }
}