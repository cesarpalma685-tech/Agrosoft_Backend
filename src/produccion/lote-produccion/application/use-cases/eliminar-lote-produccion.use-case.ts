import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoteProduccionRepositoryPort } from "../ports/lote-produccion.repository.port";

@Injectable()
export class EliminarLoteProduccionUseCase {
  constructor(private readonly repository: LoteProduccionRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const lote = await this.repository.findById(id);
    if (!lote) throw new NotFoundException(`La cosecha con ID ${id} no existe`);
    if (lote.stockDisponibleKg < lote.cantidadKg) {
      throw new BadRequestException("Esta cosecha ya tiene ventas: no se puede eliminar");
    }
    await this.repository.softDelete(id);
  }
}
