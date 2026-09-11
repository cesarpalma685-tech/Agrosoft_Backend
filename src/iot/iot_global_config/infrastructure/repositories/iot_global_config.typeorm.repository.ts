import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IotGlobalConfigRepositoryPort } from "../../application/ports/iot_global_config.repository.port";
import { IotGlobalConfig } from "../../domain/entities/iot_global_config.dto";
import { IotGlobalConfigPersistence } from "../persistence/iot_global_config.orm-entity";

@Injectable()
export class IotGlobalConfigRepository implements IotGlobalConfigRepositoryPort {
  constructor(
    @InjectRepository(IotGlobalConfigPersistence)
    private readonly repository: Repository<IotGlobalConfigPersistence>,
  ) {}

  async crear(iot_global_config: IotGlobalConfig): Promise<IotGlobalConfig> {
    const config = this.repository.create({
      name: iot_global_config.name,
      broker: iot_global_config.broker,
      port: iot_global_config.port,
      protocol: iot_global_config.protocol,
      topic_prefix: iot_global_config.topic_prefix,
      default_topics: iot_global_config.default_topics,
      custom_topics: iot_global_config.custom_topics,
      lote_id: iot_global_config.lote_id,
      sub_lote_id: iot_global_config.sub_lote_id,
      username: iot_global_config.username,
      password: iot_global_config.password,
      activo: iot_global_config.activo,
      default_sensors_initialized:
        iot_global_config.default_sensors_initialized,
      auto_discover: iot_global_config.auto_discover,
    });

    const guardada = await this.repository.save(config);

    return this.toDomain(guardada);
  }

  async listar(): Promise<IotGlobalConfig[]> {
    const configs = await this.repository.find();

    return configs.map((config) => this.toDomain(config));
  }

  async obtenerPorId(id: number): Promise<IotGlobalConfig | null> {
    const config = await this.repository.findOne({
      where: { id },
    });

    return config ? this.toDomain(config) : null;
  }

  async actualizar(
    id: number,
    datos: Partial<IotGlobalConfig>,
  ): Promise<IotGlobalConfig | null> {
    await this.repository.update(id, {
      ...datos,
    } as Partial<IotGlobalConfigPersistence>);

    const actualizada = await this.repository.findOne({
      where: { id },
    });

    return actualizada ? this.toDomain(actualizada) : null;
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  private toDomain(config: IotGlobalConfigPersistence): IotGlobalConfig {
    return new IotGlobalConfig(
      config.id,
      config.created_at,
      config.updated_at,
      config.deleted_at,
      config.name,
      config.broker,
      config.port,
      config.protocol,
      config.topic_prefix,
      config.default_topics,
      config.custom_topics,
      config.lote_id,
      config.sub_lote_id,
      config.username,
      config.password,
      config.activo,
      config.default_sensors_initialized,
      config.auto_discover,
    );
  }
}
