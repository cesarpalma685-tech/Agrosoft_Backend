import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsoHerramientaRepositoryPort } from '../../application/ports/uso-herramienta.repository.port';
import { UsoHerramienta } from '../../domain/entities/uso-herramienta.entity';
import { UsoHerramientaOrmEntity } from '../persistence/uso-herramienta.orm-entity';

@Injectable()
export class UsoHerramientaTypeOrmRepository extends UsoHerramientaRepositoryPort {
  constructor(
    @InjectRepository(UsoHerramientaOrmEntity)
    private readonly usoHerramientaRepository: Repository<UsoHerramientaOrmEntity>,
  ) {
    super();
  }

  async save(usoHerramienta: UsoHerramienta): Promise<UsoHerramienta> {
    const entity = this.usoHerramientaRepository.create({
      ...usoHerramienta,
    });

    const saved = await this.usoHerramientaRepository.save(entity);

    return saved;
  }

  async findByActividadId(actividadId: number): Promise<UsoHerramienta[]> {
    const entities = await this.usoHerramientaRepository.find({
      where: { actividadId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
