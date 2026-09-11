import { Injectable, NotFoundException } from "@nestjs/common";
import { InsumoRepositoryPort } from "../ports/insumo.repository.port";
import { Insumo } from "../../domain/entities/crear-insumo.dto";

@Injectable()
export class ObtenerInsumoPorIdUseCase {
  constructor(private readonly insumoRepository: InsumoRepositoryPort) {}

  async execute(id: number): Promise<Insumo> {
    const insumo = await this.insumoRepository.findById(id);

    if (!insumo) {
      throw new NotFoundException(`El insumo con ID ${id} no existe`);
    }

    return insumo;
  }
}
