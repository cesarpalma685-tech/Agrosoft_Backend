import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActividadResponsableRepositoryPort } from '../../application/ports/actividad-responsable.repository.port';

import { ActividadResponsableOrmEntity } from '../persistence/actividad-responsable.orm-entity';
import { ActividadResponsable } from '../../domain/entities/actividad_responsable.entity';

@Injectable()
export class ActividadResponsableTypeOrmRepository extends ActividadResponsableRepositoryPort {
  constructor(
    @InjectRepository(ActividadResponsableOrmEntity)
    private readonly actividadResponsableRepository: Repository<ActividadResponsableOrmEntity>,
  ) {
    super();
  }

  async save(responsable: ActividadResponsable): Promise<ActividadResponsable> {
    const entity = this.actividadResponsableRepository.create({
      ...responsable,
    });

    const saved = await this.actividadResponsableRepository.save(entity);

    return saved;
  }

  async findByActividadId(actividadId: number): Promise<ActividadResponsable[]> {
    const entities = await this.actividadResponsableRepository.find({
      where: { actividadId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
