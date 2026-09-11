import { Injectable, NotFoundException } from "@nestjs/common";
import { LoteRepositoryPort } from "../ports/lote.repository.port";

@Injectable()
export class EliminarLoteUseCase {
  constructor(private readonly loteRepository: LoteRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const lote = await this.loteRepository.findById(id);

    if (!lote) {
      throw new NotFoundException(
        `El lote con ID ${id} no existe para eliminar`,
      );
    }

    await this.loteRepository.softDelete(id);
  }
}
