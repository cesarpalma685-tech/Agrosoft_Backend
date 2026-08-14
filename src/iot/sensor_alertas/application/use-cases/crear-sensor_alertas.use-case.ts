import { Injectable } from '@nestjs/common';
import { SensorAlertasRepositoryPort } from '../ports/sensor_alertas.repository.port';
import { SensorAlertas } from '../../domain/entities/sensor_alertas.dto';
import { CrearSensorAlertasDto } from '../dto/crear-sensor_alertas.dto';

@Injectable()
export class CrearSensorAlertasUseCase {
  constructor(
    private readonly repository: SensorAlertasRepositoryPort,
  ) {}

  async execute(datos: CrearSensorAlertasDto) {
    const sensorAlertas  = new SensorAlertas(
      null,
      null,
      null,
      null,
      datos.sensor_id,
      datos.valor,
      datos.umbral,
      datos.tipo,
      new Date(datos.fecha_alerta),
      datos.lote_id,
      datos.sub_lote_id,
    );

    return this.repository.crear(sensorAlertas);
  }
}