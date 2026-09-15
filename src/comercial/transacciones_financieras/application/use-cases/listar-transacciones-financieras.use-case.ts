import { Injectable } from "@nestjs/common";
import { TransaccionFinanciera } from "../../domain/entities/transaccion-financiera.entity";
import { TransaccionFinancieraRepositoryPort } from "../ports/crear-transaccion-financiera.repository.port";

@Injectable()
export class ListarTransaccionesFinancierasUseCase {
  constructor(
    private readonly repository: TransaccionFinancieraRepositoryPort,
  ) {}

  async execute(ventaId?: number): Promise<TransaccionFinanciera[]> {
    if (ventaId) {
      return await this.repository.findByVentaId(ventaId);
    }
    return await this.repository.findAll();
  }
}
