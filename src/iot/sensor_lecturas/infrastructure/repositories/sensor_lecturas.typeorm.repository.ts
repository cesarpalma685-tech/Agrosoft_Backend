import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SensorLecturasRepositoryPort } from '../../application/ports/sensor_lecturas.repository.port';
import { SensorLecturas } from '../../domain/entities/sensor_lecturas.dto';
import { SensorLecturasOrmEntity } from '../persistence/sensor_lecturas.orm-entity';

@Injectable()
export class SensorLecturasTypeormRepository
  implements SensorLecturasRepositoryPort
{
  constructor(
    @InjectRepository(SensorLecturasOrmEntity)
    private readonly repository: Repository<SensorLecturasOrmEntity>,
  ) {}

  async crear(
    sensorLectura: SensorLecturas,
  ): Promise<SensorLecturas> {
    const entity = this.repository.create(sensorLectura);

    const guardado = await this.repository.save(entity);

    return guardado as unknown as SensorLecturas;
  }

  async BuscarPorId(
  id: number,
): Promise<SensorLecturas | null> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    return entity as unknown as SensorLecturas | null;
  }

  async listar(): Promise<SensorLecturas[]> {
    const entities = await this.repository.find();

    return entities as unknown as SensorLecturas[];
  }

  async actualizar(
    id: number,
    datos: Partial<SensorLecturas>,
  ): Promise<SensorLecturas> {
    await this.repository.update(id, datos);

    const actualizado = await this.BuscarPorId(id);

    if (!actualizado) {
      throw new Error(
        `La lectura con id ${id} no existe`,
      );
    }

    return actualizado;
  }

  async eliminar(id: number): Promise<void> {

   await this.repository.delete(id); 
  }
  
  }
