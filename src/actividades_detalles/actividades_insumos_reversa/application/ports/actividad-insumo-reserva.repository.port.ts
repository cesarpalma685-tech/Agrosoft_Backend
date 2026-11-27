import { ActividadInsumoReserva } from "../../domain/entities/actividad-insumo-reserva.entity";

export abstract class ActividadInsumoReservaRepositoryPort {
  abstract save(
    reserva: ActividadInsumoReserva,
  ): Promise<ActividadInsumoReserva>;
  abstract findAll(): Promise<ActividadInsumoReserva[]>;
  abstract findByActividadIds(ids: number[]): Promise<ActividadInsumoReserva[]>;
}
