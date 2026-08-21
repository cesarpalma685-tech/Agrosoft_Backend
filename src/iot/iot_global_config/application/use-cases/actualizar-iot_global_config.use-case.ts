import { Injectable, NotFoundException } from '@nestjs/common';
import { IotGlobalConfigRepositoryPort } from '../ports/iot_global_config.repository.port';
import { CrearIotGlobalConfigDto } from '../dto/crear-iot_global_config.dto';

@Injectable()
export class ActualizarIotGlobalConfigUseCase {
  constructor(
    private readonly repository: IotGlobalConfigRepositoryPort,
  ) {}

  async execute(
    id: number,
    datos: Partial<CrearIotGlobalConfigDto>,
  ) {
    const iot_global_config =
      await this.repository.obtenerPorId(id);

    if (!iot_global_config) {
      throw new NotFoundException(
        `Configuración IoT con ID ${id} no encontrada`,
      );
    }

    return this.repository.actualizar(
      id,
      datos,
    );
  }
}