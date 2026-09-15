import { SensorRepositoryPort } from "../ports/sensores.repository.port";

export class ActualizarSensorUseCase {
  constructor(private readonly sensorRepository: SensorRepositoryPort) {}

  async execute(id: number, datos: any) {
    return await this.sensorRepository.actualizar(id, datos);
  }
}
