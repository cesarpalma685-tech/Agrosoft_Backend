import { Injectable, NotFoundException } from "@nestjs/common";
import { TiposSensoresRepositoryPort } from "../ports/tipos_sensores.repository.port";
import { TiposSensores } from "../../domain/entities/tipos_sensores.dto";

@Injectable()
export class ActualizarTiposSensoresUseCase {
  constructor(
    private readonly tiposSensoresRepository: TiposSensoresRepositoryPort,
  ) {}

  async execute(
    id: number,
    dto: Partial<TiposSensores>,
  ): Promise<TiposSensores> {
    // Verificar que el tipo de sensor exista
    const existe = await this.tiposSensoresRepository.buscarPorId(id);

    if (!existe) {
      throw new NotFoundException(
        `El tipo de sensor con ID ${id} no existe para actualizar`,
      );
    }

    // Actualizar el tipo de sensor
    const tiposSensoresActualizado =
      await this.tiposSensoresRepository.actualizar(id, dto);

    if (!tiposSensoresActualizado) {
      throw new NotFoundException(
        `No se pudo actualizar el tipo de sensor con ID ${id}`,
      );
    }

    return tiposSensoresActualizado;
  }
}
