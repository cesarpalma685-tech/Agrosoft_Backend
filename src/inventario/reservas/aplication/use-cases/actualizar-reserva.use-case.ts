import { Injectable, NotFoundException } from "@nestjs/common";
import { ReservaRepositoryPort } from "../ports/reserva.repository.port";
import { CrearReservaDto } from "../dto/crear-reservas.dto";
import { Reserva } from "../../domain/entities/crear-reserva.dto";
@Injectable()
export class ActualizarReservaUseCase {
  constructor(private readonly reservaRepository: ReservaRepositoryPort) {}

  async execute(id: number, dto: Partial<CrearReservaDto>): Promise<Reserva> {
    const existe = await this.reservaRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`La reserva con ID ${id} no existe`);
    }

    const payload: Partial<Reserva> = { ...dto } as any;
    if (dto.fechaReserva) {
      payload.fechaReserva = new Date(dto.fechaReserva);
    }

    return await this.reservaRepository.update(id, payload);
  }
}
