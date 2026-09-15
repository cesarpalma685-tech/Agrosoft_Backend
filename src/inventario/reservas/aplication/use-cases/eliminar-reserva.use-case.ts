import { Injectable, NotFoundException } from "@nestjs/common";
import { ReservaRepositoryPort } from "../ports/reserva.repository.port";

@Injectable()
export class EliminarReservaUseCase {
  constructor(private readonly reservaRepository: ReservaRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existe = await this.reservaRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`La reserva con ID ${id} no existe`);
    }
    await this.reservaRepository.softDelete(id);
  }
}
