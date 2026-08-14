import { Injectable, NotFoundException } from '@nestjs/common';
import { SensorLecturasRepositoryPort } from '../ports/sensor_lecturas.repository.port';

@Injectable()
export class EliminarSensorLecturasPorIdUseCase {
  constructor(
    private readonly repository: SensorLecturasRepositoryPort,
  ) {}

  async execute(id: number) {
    const sensorLectura = await this.repository.BuscarPorId(id);

    if (!sensorLectura) {
      throw new NotFoundException(
        `La lectura con id ${id} no existe`,
      );
    }

    await this.repository.eliminar(id);
  }
}