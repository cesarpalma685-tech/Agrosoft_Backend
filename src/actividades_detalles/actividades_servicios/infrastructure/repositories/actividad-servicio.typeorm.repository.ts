import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActividadServicioRepositoryPort } from '../../application/ports/actividad-servicio.repository.port';
import { ActividadServicio } from '../../domain/entities/actividad-servicio.entity';
import { ActividadServicioOrmEntity } from '../persistence/actividad-servicio.orm-entity';

@Injectable()
export class ActividadServicioTypeOrmRepository extends ActividadServicioRepositoryPort {
  constructor(
    @InjectRepository(ActividadServicioOrmEntity)
    private readonly actividadServicioRepository: Repository<ActividadServicioOrmEntity>,
  ) {
    super();
  }

  async save(servicio: ActividadServicio): Promise<ActividadServicio> {
    const entity = this.actividadServicioRepository.create({
      ...servicio,
    });

    const saved = await this.actividadServicioRepository.save(entity);

    return saved;
  }

  async findByActividadId(actividadId: number): Promise<ActividadServicio[]> {
    const entities = await this.actividadServicioRepository.find({
      where: { actividadId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
