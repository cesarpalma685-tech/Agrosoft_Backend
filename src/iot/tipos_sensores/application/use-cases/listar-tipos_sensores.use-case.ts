import { Injectable } from "@nestjs/common";
import { TiposSensoresRepositoryPort } from "../ports/tipos_sensores.repository.port";
import { TiposSensores } from "../../domain/entities/tipos_sensores.dto";

@Injectable()
export class ListarTiposSensoresUseCase {
  constructor(
    private readonly tiposSensoresRepository: TiposSensoresRepositoryPort,
  ) {}

  async execute(): Promise<TiposSensores[]> {
    return await this.tiposSensoresRepository.listar();
  }
}
