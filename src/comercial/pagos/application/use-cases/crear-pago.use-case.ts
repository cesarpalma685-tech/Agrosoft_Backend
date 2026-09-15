import { Injectable } from "@nestjs/common";
import { PagoRepositoryPort } from "../ports/pago.repository.port";
import { CrearPagoDto } from "../dto/crear-pago.dto";
import { Pago } from "../../domain/entities/pago.entity";

@Injectable()
export class CrearPagoUseCase {
  constructor(private readonly repository: PagoRepositoryPort) {}

  async execute(dto: CrearPagoDto): Promise<Pago> {
    const nuevoPago = new Pago();
    Object.assign(nuevoPago, dto);
    return await this.repository.save(nuevoPago);
  }
}
