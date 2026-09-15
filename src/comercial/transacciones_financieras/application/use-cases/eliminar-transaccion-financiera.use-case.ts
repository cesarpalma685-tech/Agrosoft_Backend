import { Injectable, NotFoundException } from "@nestjs/common";
import { TransaccionFinancieraRepositoryPort } from "../ports/crear-transaccion-financiera.repository.port";

@Injectable()
export class EliminarTransaccionFinancieraUseCase {
  constructor(
    private readonly repository: TransaccionFinancieraRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existe = await this.repository.findById(id);
    if (!existe) {
      throw new NotFoundException(
        `La transacción financiera con ID ${id} no existe`,
      );
    }
    await this.repository.softDelete(id);
  }
}
