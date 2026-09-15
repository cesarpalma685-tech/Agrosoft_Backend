import { Injectable, NotFoundException } from "@nestjs/common";
import { InsumoRepositoryPort } from "../ports/insumo.repository.port";

@Injectable()
export class EliminarInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepositoryPort) {}

  async execute(id: number): Promise<void> {
    // 1. Verificamos si el registro existe
    const existe = await this.insumoRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(
        `El insumo con ID ${id} no existe para eliminar`,
      );
    }

    // 2. Ejecutamos el borrado (soft delete o permanente según tu puerto)
    await this.insumoRepository.softDelete(id);
  }
}
