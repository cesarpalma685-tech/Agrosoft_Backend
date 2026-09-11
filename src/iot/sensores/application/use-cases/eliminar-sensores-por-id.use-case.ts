import { SensorRepositoryPort } from "../ports/sensores.repository.port";

export class EliminarSensorUseCase {
  constructor(private readonly sensorRepository: SensorRepositoryPort) {}

  async execute(id: number) {
    return await this.sensorRepository.eliminar(id);
  }
}
