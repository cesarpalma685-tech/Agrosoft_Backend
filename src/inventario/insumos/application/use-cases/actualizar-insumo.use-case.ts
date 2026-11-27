import { Injectable, NotFoundException } from "@nestjs/common";
import { InsumoRepositoryPort } from "../ports/insumo.repository.port";
import { ActualizarInsumoDto } from "../dto/crear-insumo.dto";
import { Insumo } from "../../domain/entities/crear-insumo.dto";
import { calcularDerivados } from "../utils/calcular-derivados";

@Injectable()
export class ActualizarInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepositoryPort) {}

  async execute(id: number, dto: ActualizarInsumoDto): Promise<Insumo> {
    const existe = await this.insumoRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El insumo con ID ${id} no existe para actualizar`);
    }

    // Se recalculan los derivados con los datos ya mezclados (lo guardado + lo nuevo)
    const cambios = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined),
    ) as Partial<Insumo>;
    Object.assign(cambios, calcularDerivados({ ...existe, ...cambios }));

    return await this.insumoRepository.update(id, cambios);
  }
}
