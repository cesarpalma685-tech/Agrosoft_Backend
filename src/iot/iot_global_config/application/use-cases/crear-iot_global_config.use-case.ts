import { Injectable } from '@nestjs/common';
import { IotGlobalConfigRepositoryPort } from '../ports/iot_global_config.repository.port';
import { IotGlobalConfig } from '../../domain/entities/iot_global_config.dto';
import { CrearIotGlobalConfigDto } from '../dto/crear-iot_global_config.dto';

@Injectable()
export class CrearIotGlobalConfigUseCase {
  constructor(
    private readonly repository: IotGlobalConfigRepositoryPort,
  ) {}

  async execute(datos: CrearIotGlobalConfigDto) {
    const iot_global_config = new IotGlobalConfig(
      null,
      null,
      null,
      null,
      datos.name,
      datos.broker,
      datos.port,
      datos.protocol,
      datos.topic_prefix,
      datos.default_topics,
      datos.custom_topics,
      datos.lote_id,
      datos.sub_lote_id,
      datos.username,
      datos.password,
      datos.activo,
      datos.default_sensors_initialized,
      datos.auto_discover,
    );

    return this.repository.crear(iot_global_config);
  }
}