import { Injectable } from "@nestjs/common";
import { SensorLecturasRepositoryPort } from "../ports/sensor_lecturas.repository.port";

@Injectable()
export class ListarSensorLecturasUseCase {
  constructor(private readonly repository: SensorLecturasRepositoryPort) {}

  async execute() {
    return await this.repository.listar();
  }
}
