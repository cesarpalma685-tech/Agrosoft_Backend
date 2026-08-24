import { Injectable, NotFoundException } from '@nestjs/common';
import { SensorAlertasRepositoryPort } from '../ports/sensor_alertas.repository.port';

@Injectable()
export class EliminarSensorAlertasPorIdUseCase {
  constructor(
    private readonly repository: SensorAlertasRepositoryPort,
  ) {}

  async execute(id: number) {
    const sensorAlertas = await this.repository.buscarPorId(id);

    if (!sensorAlertas) {
      throw new NotFoundException(
        `Sensor alerta con ID ${id} no encontrado`,
      );
    }

    await this.repository.eliminar(id);

    return {
      mensaje: 'Sensor alerta eliminada correctamente',
    };
  }
}