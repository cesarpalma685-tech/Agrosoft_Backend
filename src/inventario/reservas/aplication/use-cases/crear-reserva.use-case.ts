import { Injectable } from "@nestjs/common";
import { ReservaEstadoEnum } from "../../domain/enums/reserva-estado.enum";
import { ReservaRepositoryPort } from "../ports/reserva.repository.port";
import { CrearReservaDto } from "../dto/crear-reservas.dto";
import { Reserva } from "../../domain/entities/crear-reserva.dto";

@Injectable()
export class CrearReservaUseCase {
  constructor(private readonly reservaRepository: ReservaRepositoryPort) {}

  async execute(dto: CrearReservaDto): Promise<Reserva> {
    const nuevaReserva = new Reserva();
    Object.assign(nuevaReserva, dto);

    if (dto.fechaReserva) {
      nuevaReserva.fechaReserva = new Date(dto.fechaReserva);
    }

    if (!nuevaReserva.estado) {
      nuevaReserva.estado;
    }

    return await this.reservaRepository.save(nuevaReserva);
  }
}
