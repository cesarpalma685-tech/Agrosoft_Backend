import { Injectable, NotFoundException } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";
import { Venta } from "../../domain/entities/crear-venta.entity";

@Injectable()
export class ObtenerVentaPorIdUseCase {
  constructor(private readonly ventaRepository: VentaRepositoryPort) {}

  async execute(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findById(id);
    if (!venta) {
      throw new NotFoundException(`La venta con ID ${id} no fue encontrada`);
    }
    return venta;
  }
}
