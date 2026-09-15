import { Injectable, NotFoundException } from "@nestjs/common";
import { Sublote } from "../../domain/entities/sublote.dto";
import { SubloteRepositoryPort } from "../ports/sublote.repository.port";

@Injectable()
export class ActualizarSubloteUseCase {
  constructor(private readonly subloteRepository: SubloteRepositoryPort) {}

  async execute(id: number, dto: Partial<Sublote>): Promise<Sublote | null> {
    // Verificar que el sublote exista
    const existe = await this.subloteRepository.findById(id);

    if (!existe) {
      throw new NotFoundException(
        `El sublote con ID ${id} no existe para actualizar`,
      );
    }

    // Actualizar el sublote
    const subloteActualizado = await this.subloteRepository.update(id, dto);

    if (!subloteActualizado) {
      throw new NotFoundException(
        `No se pudo actualizar el sublote con ID ${id}`,
      );
    }

    return subloteActualizado;
  }
}
