import { Injectable, NotFoundException } from "@nestjs/common";
import { ReservaRepositoryPort } from "../ports/reserva.repository.port";
import { Reserva } from "../../domain/entities/crear-reserva.dto";

@Injectable()
export class ObtenerReservaPorIdUseCase {
  constructor(private readonly reservaRepository: ReservaRepositoryPort) {}

  async execute(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findById(id);
    if (!reserva) {
      throw new NotFoundException(`La reserva con ID ${id} no fue encontrada`);
    }
    return reserva;
  }
}
