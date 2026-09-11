import { Injectable, NotFoundException } from "@nestjs/common";
import { IotGlobalConfigRepositoryPort } from "../ports/iot_global_config.repository.port";

@Injectable()
export class EliminarIotGlobalConfigUseCase {
  constructor(private readonly repository: IotGlobalConfigRepositoryPort) {}

  async execute(id: number) {
    const iot_global_config = await this.repository.obtenerPorId(id);

    if (!iot_global_config) {
      throw new NotFoundException(
        `Configuración IoT con ID ${id} no encontrada`,
      );
    }

    await this.repository.eliminar(id);

    return {
      mensaje: "Configuración IoT eliminada correctamente",
    };
  }
}
