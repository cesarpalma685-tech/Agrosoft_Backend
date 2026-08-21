import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SensorRepositoryPort } from '../../application/ports/sensores.repository.port';
import { Sensor } from '../../domain/entities/sensores.dto';
import { SensorOrmEntity } from '../persistence/sensores.orm-entity';

@Injectable()
export class SensorTypeormRepository implements SensorRepositoryPort {
  constructor(
    @InjectRepository(SensorOrmEntity)
    private readonly repository: Repository<SensorOrmEntity>,
  ) {}

  async crear(sensor: Sensor): Promise<Sensor> {
    const entity = this.repository.create(sensor);

    return await this.repository.save(entity) as unknown as Sensor;
  }

  async buscarPorId(id: number): Promise<Sensor | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity as unknown as Sensor | null;
  }

  async listar(): Promise<Sensor[]> {
    const entities = await this.repository.find();

    return entities as unknown as Sensor[];
  }

  async actualizar(
    id: number,
    datos: Partial<Sensor>,
  ): Promise<Sensor> {
    await this.repository.update(id, datos);

    const actualizado = await this.buscarPorId(id);

    if (!actualizado) {
      throw new Error(`El sensor con ID ${id} no existe`);
    }

    return actualizado;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}