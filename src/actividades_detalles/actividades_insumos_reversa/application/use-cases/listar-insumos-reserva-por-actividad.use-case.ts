import { Injectable } from "@nestjs/common";
import { ActividadInsumoReservaRepositoryPort } from "../ports/actividad-insumo-reserva.repository.port";
import { ActividadInsumoReserva } from "../../domain/entities/actividad-insumo-reserva.entity";

@Injectable()
export class ListarActividadInsumoReservasUseCase {
  constructor(
    private readonly actividadInsumoReservaRepository: ActividadInsumoReservaRepositoryPort,
  ) {}

  async execute(): Promise<ActividadInsumoReserva[]> {
    return await this.actividadInsumoReservaRepository.findAll();
  }
}
