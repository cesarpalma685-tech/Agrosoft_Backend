import { Injectable, NotFoundException } from "@nestjs/common";
import { HistorialPrecioLoteRepositoryPort } from "../ports/historial-precio-lote.repository.port";
import { HistorialPrecioLote } from "../../domain/entities/historial-precio-lote.entity";

@Injectable()
export class ObtenerHistorialPrecioLotePorIdUseCase {
  constructor(private readonly repository: HistorialPrecioLoteRepositoryPort) {}

  async execute(id: number): Promise<HistorialPrecioLote> {
    const registro = await this.repository.findById(id);
    if (!registro) {
      throw new NotFoundException(
        `El historial de precio con ID ${id} no fue encontrado`,
      );
    }
    return registro;
  }
}
