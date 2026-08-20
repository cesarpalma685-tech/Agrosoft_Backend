import { InsumoActividad } from '../entities/insumo-actividad.entity';

export const INSUMO_ACTIVIDAD_REPOSITORY = 'INSUMO_ACTIVIDAD_REPOSITORY';

export interface InsumoActividadRepositoryPort {
  guardar(insumo: InsumoActividad): Promise<InsumoActividad>;
  buscarPorId(id: number): Promise<InsumoActividad | null>;
  listarPorActividad(actividadId: number): Promise<InsumoActividad[]>;
  eliminar(id: number): Promise<void>;
}