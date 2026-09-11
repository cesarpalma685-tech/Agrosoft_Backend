import { Injectable, NotFoundException } from "@nestjs/common";
import { TiposSensoresRepositoryPort } from "../ports/tipos_sensores.repository.port";
import { TiposSensores } from "../../domain/entities/tipos_sensores.dto";

@Injectable()
export class ObtenerTiposSensoresPorIdUseCase {
  constructor(
    private readonly tiposSensoresRepository: TiposSensoresRepositoryPort,
  ) {}

  async execute(id: number): Promise<TiposSensores> {
    const tiposSensores = await this.tiposSensoresRepository.buscarPorId(id);

    if (!tiposSensores) {
      throw new NotFoundException(`El tipo de sensor con ID ${id} no existe`);
    }

    return tiposSensores;
  }
}
