import { Injectable } from "@nestjs/common";
import { IotGlobalConfigRepositoryPort } from "../ports/iot_global_config.repository.port";

@Injectable()
export class ListarIotGlobalConfigUseCase {
  constructor(private readonly repository: IotGlobalConfigRepositoryPort) {}

  async execute() {
    return this.repository.listar();
  }
}
