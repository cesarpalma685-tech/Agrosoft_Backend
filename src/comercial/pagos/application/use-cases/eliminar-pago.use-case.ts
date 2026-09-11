import { Injectable, NotFoundException } from "@nestjs/common";
import { PagoRepositoryPort } from "../ports/pago.repository.port";

@Injectable()
export class EliminarPagoUseCase {
  constructor(private readonly repository: PagoRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El pago con ID ${id} no existe`);
    }
    await this.repository.softDelete(id);
  }
}
