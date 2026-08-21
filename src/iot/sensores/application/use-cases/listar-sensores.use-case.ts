import { Injectable } from '@nestjs/common';
import { SensorRepositoryPort } from '../ports/sensores.repository.port';
import { Sensor } from '../../domain/entities/sensores.dto';

@Injectable()
export class ListarSensoresUseCase {
  constructor(
    private readonly sensorRepository: SensorRepositoryPort,
  ) {}

  async execute(): Promise<Sensor[]> {
    return await this.sensorRepository.listar();
  }
}