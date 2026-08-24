import { SensorRepositoryPort } from '../ports/sensores.repository.port';

export class ListarSensoresUseCase {
  constructor(
    private readonly sensorRepository: SensorRepositoryPort,
  ) {}

  async execute() {
    return await this.sensorRepository.listar();
  }
}