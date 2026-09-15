import { Injectable } from "@nestjs/common";
import { FacturaRepositoryPort } from "../ports/factura.repository.port";
import { CrearFacturaDto } from "../dto/crear-factura.dto";
import { Factura } from "../../domain/entities/factura.entity";

@Injectable()
export class CrearFacturaUseCase {
  constructor(private readonly repository: FacturaRepositoryPort) {}

  async execute(dto: CrearFacturaDto): Promise<Factura> {
    const nuevaFactura = new Factura();
    Object.assign(nuevaFactura, dto);

    if (dto.fechaEmision) {
      nuevaFactura.fechaEmision = new Date(dto.fechaEmision);
    }
    if (dto.vencimiento) {
      nuevaFactura.vencimiento = new Date(dto.vencimiento);
    }

    return await this.repository.save(nuevaFactura);
  }
}
