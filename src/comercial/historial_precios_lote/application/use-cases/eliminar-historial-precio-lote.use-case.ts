import { Injectable, NotFoundException } from "@nestjs/common";
import { HistorialPrecioLoteRepositoryPort } from "../ports/historial-precio-lote.repository.port";

@Injectable()
export class EliminarHistorialPrecioLoteUseCase {
  constructor(private readonly repository: HistorialPrecioLoteRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(
        `El historial de precio con ID ${id} no existe`,
      );
    }
    await this.repository.softDelete(id);
  }
}
