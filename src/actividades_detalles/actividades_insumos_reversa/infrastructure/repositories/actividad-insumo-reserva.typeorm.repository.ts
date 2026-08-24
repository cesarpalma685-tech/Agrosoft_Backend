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

  async save(reserva: ActividadInsumoReserva): Promise<ActividadInsumoReserva> {
    const entity = this.actividadInsumoReservaRepository.create({ ...reserva });
    return await this.actividadInsumoReservaRepository.save(entity);
  }

  async findAll(): Promise<ActividadInsumoReserva[]> {
    return await this.actividadInsumoReservaRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
