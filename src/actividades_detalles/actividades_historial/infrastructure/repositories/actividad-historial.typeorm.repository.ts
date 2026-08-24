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
    const entity = this.actividadHistorialRepository.create({ ...historial });
    return await this.actividadHistorialRepository.save(entity);
  }

  async findAll(): Promise<ActividadHistorial[]> {
    return await this.actividadHistorialRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
