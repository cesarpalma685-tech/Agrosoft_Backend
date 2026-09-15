import { Injectable, NotFoundException } from "@nestjs/common";

import { SensorAlertasRepositoryPort } from "../ports/sensor_alertas.repository.port";
import { CrearSensorAlertasDto } from "../dto/crear-sensor_alertas.dto";
import { SensorAlertas } from "../../domain/entities/sensor_alertas.dto";

@Injectable()
export class ActualizarSensorAlertasUseCase {
  constructor(private readonly repository: SensorAlertasRepositoryPort) {}

  async execute(id: number, datos: Partial<CrearSensorAlertasDto>) {
    const sensorAlertas = await this.repository.buscarPorId(id);

    if (!sensorAlertas) {
      throw new NotFoundException(`Sensor alerta con ID ${id} no encontrado`);
    }

    const datosActualizados: Partial<SensorAlertas> = {
      sensor_id: datos.sensor_id,
      valor: datos.valor,
      umbral: datos.umbral,
      tipo: datos.tipo,
      lote_id: datos.lote_id,
      sub_lote_id: datos.sub_lote_id,
      fecha_alerta: datos.fecha_alerta
        ? new Date(datos.fecha_alerta)
        : undefined,
    };

    return this.repository.actualizar(id, datosActualizados);
  }
}
