import { Injectable } from "@nestjs/common";
import { SensorAlertasRepositoryPort } from "../ports/sensor_alertas.repository.port";

@Injectable()
export class ListarSensorAlertasUseCase {
  constructor(private readonly repository: SensorAlertasRepositoryPort) {}

  async execute() {
    return this.repository.listar();
  }
}
