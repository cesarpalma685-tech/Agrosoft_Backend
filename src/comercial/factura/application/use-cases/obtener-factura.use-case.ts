import { Injectable, NotFoundException } from "@nestjs/common";
import { FacturaRepositoryPort } from "../ports/factura.repository.port";
import { Factura } from "../../domain/entities/factura.entity";

@Injectable()
export class ObtenerFacturaPorIdUseCase {
  constructor(private readonly repository: FacturaRepositoryPort) {}

  async execute(id: number): Promise<Factura> {
    const factura = await this.repository.findById(id);
    if (!factura) {
      throw new NotFoundException(`La factura con ID ${id} no fue encontrada`);
    }
    return factura;
  }
}
