import { Injectable, NotFoundException } from "@nestjs/common";
import { SensorAlertasRepositoryPort } from "../ports/sensor_alertas.repository.port";

@Injectable()
export class ObtenerSensorAlertasPorIdUseCase {
  constructor(private readonly repository: SensorAlertasRepositoryPort) {}

  async execute(id: number) {
    const sensorAlertas = await this.repository.buscarPorId(id);
    if (!sensorAlertas) {
      throw new NotFoundException(`Sensor alerta con ID ${id} no encontrado`);
    }

    return sensorAlertas;
  }
}
