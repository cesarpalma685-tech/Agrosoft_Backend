import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActividadInsumoUsoRepositoryPort } from '../../application/ports/actividad-insumo-uso.repository.port';
import { ActividadInsumoUso } from '../../domain/entities/actividad-insumo-uso.entity';
import { ActividadInsumoUsoOrmEntity } from '../persistence/actividad-insumo-uso.orm-entity';

@Injectable()
export class ActividadInsumoUsoTypeOrmRepository extends ActividadInsumoUsoRepositoryPort {
  constructor(
    @InjectRepository(ActividadInsumoUsoOrmEntity)
    private readonly actividadInsumoUsoRepository: Repository<ActividadInsumoUsoOrmEntity>,
  ) {
    super();
  }

  async save(insumoUso: ActividadInsumoUso): Promise<ActividadInsumoUso> {
    const entity = this.actividadInsumoUsoRepository.create({
      ...insumoUso,
    });

    const saved = await this.actividadInsumoUsoRepository.save(entity);

    return saved;
  }

  async findByActividadId(actividadId: number): Promise<ActividadInsumoUso[]> {
    const entities = await this.actividadInsumoUsoRepository.find({
      where: { actividadId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
