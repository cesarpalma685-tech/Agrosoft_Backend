import { CrearSensorDto } from "../dto/crear-sensores.dto";
import { SensorRepositoryPort } from "../ports/sensores.repository.port";

export class CrearSensorUseCase {
  constructor(private readonly sensorRepository: SensorRepositoryPort) {}

  async execute(dto: CrearSensorDto) {
    return await this.sensorRepository.crear(dto as any);
  }
}
