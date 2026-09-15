import { Injectable, NotFoundException } from "@nestjs/common";
import { PagoRepositoryPort } from "../ports/pago.repository.port";
import { Pago } from "../../domain/entities/pago.entity";

@Injectable()
export class ObtenerPagoPorIdUseCase {
  constructor(private readonly repository: PagoRepositoryPort) {}

  async execute(id: number): Promise<Pago> {
    const pago = await this.repository.findById(id);
    if (!pago) {
      throw new NotFoundException(`El pago con ID ${id} no fue encontrado`);
    }
    return pago;
  }
}
