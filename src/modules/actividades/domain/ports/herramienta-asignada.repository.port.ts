import { HerramientaAsignada } from '../entities/herramienta-asignada.entity';

export const HERRAMIENTA_ASIGNADA_REPOSITORY = 'HERRAMIENTA_ASIGNADA_REPOSITORY';

export interface HerramientaAsignadaRepositoryPort {
  guardar(herramienta: HerramientaAsignada): Promise<HerramientaAsignada>;
  buscarPorId(id: number): Promise<HerramientaAsignada | null>;
  listarPorActividad(actividadId: number): Promise<HerramientaAsignada[]>;
  eliminar(id: number): Promise<void>;
}