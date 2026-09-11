import { IotGlobalConfig } from "../../domain/entities/iot_global_config.dto";

export abstract class IotGlobalConfigRepositoryPort {
  abstract crear(iot_global_config: IotGlobalConfig): Promise<IotGlobalConfig>;

  abstract listar(): Promise<IotGlobalConfig[]>;

  abstract obtenerPorId(id: number): Promise<IotGlobalConfig | null>;

  abstract actualizar(
    id: number,
    datos: Partial<IotGlobalConfig>,
  ): Promise<IotGlobalConfig | null>;

  abstract eliminar(id: number): Promise<void>;
}
