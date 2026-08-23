import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';

export abstract class ActividadInsumoReservaRepositoryPort {
  abstract save(insumoReserva: ActividadInsumoReserva): Promise<ActividadInsumoReserva>;

  abstract findByActividadId(actividadId: number): Promise<ActividadInsumoReserva[]>;
}
