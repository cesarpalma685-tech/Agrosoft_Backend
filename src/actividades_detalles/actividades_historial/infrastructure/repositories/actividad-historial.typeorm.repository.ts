import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActividadHistorialRepositoryPort } from '../../application/ports/actividad-historial.repository.port';
import { ActividadHistorial } from '../../domain/entities/actividad-historial.entity';
import { ActividadHistorialOrmEntity } from '../persistence/actividad-historial.orm-entity';

@Injectable()
export class ActividadHistorialTypeOrmRepository extends ActividadHistorialRepositoryPort {
  constructor(
    @InjectRepository(ActividadHistorialOrmEntity)
    private readonly actividadHistorialRepository: Repository<ActividadHistorialOrmEntity>,
  ) {
    super();
  }

  async save(historial: ActividadHistorial): Promise<ActividadHistorial> {
    const entity = this.actividadHistorialRepository.create({
      ...historial,
    });

    const saved = await this.actividadHistorialRepository.save(entity);

    return saved;
  }

  async findAll(): Promise<ActividadHistorial[]> {
    const entities = await this.actividadHistorialRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
