import { Injectable, NotFoundException } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";

@Injectable()
export class EliminarVentaUseCase {
  constructor(private readonly ventaRepository: VentaRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existe = await this.ventaRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`La venta con ID ${id} no existe`);
    }
    await this.ventaRepository.softDelete(id);
  }
}
