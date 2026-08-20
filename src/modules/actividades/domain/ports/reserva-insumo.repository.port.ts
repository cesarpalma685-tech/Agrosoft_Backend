import { ReservaInsumo } from '../entities/reserva-insumo.entity';

export const RESERVA_INSUMO_REPOSITORY = 'RESERVA_INSUMO_REPOSITORY';

export interface ReservaInsumoRepositoryPort {
  guardar(reserva: ReservaInsumo): Promise<ReservaInsumo>;
  buscarPorId(id: number): Promise<ReservaInsumo | null>;
  listarPorActividad(actividadId: number): Promise<ReservaInsumo[]>;
  eliminar(id: number): Promise<void>;
}