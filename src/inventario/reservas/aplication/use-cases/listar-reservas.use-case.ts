import { Injectable } from "@nestjs/common";
import { ReservaRepositoryPort } from "../ports/reserva.repository.port";
import { Reserva } from "../../domain/entities/crear-reserva.dto";
@Injectable()
export class ListarReservasUseCase {
  constructor(private readonly reservaRepository: ReservaRepositoryPort) {}

  async execute(): Promise<Reserva[]> {
    return await this.reservaRepository.findAll();
  }
}
