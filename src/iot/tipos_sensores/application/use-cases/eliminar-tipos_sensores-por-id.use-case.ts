import { Injectable, NotFoundException } from "@nestjs/common";
import { TiposSensoresRepositoryPort } from "../ports/tipos_sensores.repository.port";

@Injectable()
export class EliminarTiposSensoresUseCase {
  constructor(
    private readonly tiposSensoresRepository: TiposSensoresRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const tiposSensores = await this.tiposSensoresRepository.buscarPorId(id);

    if (!tiposSensores) {
      throw new NotFoundException(
        `El tipo de sensor con ID ${id} no existe para eliminar`,
      );
    }

    await this.tiposSensoresRepository.eliminar(id);
  }
}
