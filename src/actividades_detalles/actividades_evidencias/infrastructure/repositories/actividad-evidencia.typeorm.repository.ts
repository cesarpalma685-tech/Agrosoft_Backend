import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActividadEvidenciaRepositoryPort } from '../../application/ports/actividad-evidencia.repository.port';
import { ActividadEvidenciaOrmEntity } from '../persistence/actividad-evidencia.orm-entity';
import { ActividadEvidencia } from '../../domain/entities/actividad_evidencia.entity';

@Injectable()
export class ActividadEvidenciaTypeOrmRepository extends ActividadEvidenciaRepositoryPort {
  constructor(
    @InjectRepository(ActividadEvidenciaOrmEntity)
    private readonly actividadEvidenciaRepository: Repository<ActividadEvidenciaOrmEntity>,
  ) {
    super();
  }

  async save(evidencia: ActividadEvidencia): Promise<ActividadEvidencia> {
    const entity = this.actividadEvidenciaRepository.create({
      ...evidencia,
    });

    const saved = await this.actividadEvidenciaRepository.save(entity);

    return saved;
  }

  async findByActividadId(actividadId: number): Promise<ActividadEvidencia[]> {
    const entities = await this.actividadEvidenciaRepository.find({
      where: { actividadId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
