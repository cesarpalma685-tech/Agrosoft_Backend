import { Injectable, NotFoundException } from "@nestjs/common";
import { FacturaRepositoryPort } from "../ports/factura.repository.port";

@Injectable()
export class EliminarFacturaUseCase {
  constructor(private readonly repository: FacturaRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`La factura con ID ${id} no existe`);
    }
    await this.repository.softDelete(id);
  }
}
