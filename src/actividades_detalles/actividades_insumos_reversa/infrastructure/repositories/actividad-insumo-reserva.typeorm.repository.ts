import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActividadInsumoReservaRepositoryPort } from '../../application/ports/actividad-insumo-reserva.repository.port';
import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';
import { ActividadInsumoReservaOrmEntity } from '../persistence/actividad-insumo-reserva.orm-entity';

@Injectable()
export class ActividadInsumoReservaTypeOrmRepository extends ActividadInsumoReservaRepositoryPort {
  constructor(
    @InjectRepository(ActividadInsumoReservaOrmEntity)
    private readonly actividadInsumoReservaRepository: Repository<ActividadInsumoReservaOrmEntity>,
  ) {
    super();
  }

  async save(insumoReserva: ActividadInsumoReserva): Promise<ActividadInsumoReserva> {
    const entity = this.actividadInsumoReservaRepository.create({
      ...insumoReserva,
    });

    const saved = await this.actividadInsumoReservaRepository.save(entity);

    return saved;
  }

  async findByActividadId(actividadId: number): Promise<ActividadInsumoReserva[]> {
    const entities = await this.actividadInsumoReservaRepository.find({
      where: { actividadId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities;
  }
}
