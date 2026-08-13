import { Responsable } from '../entities/responsable.entity';

export const RESPONSABLE_REPOSITORY = 'RESPONSABLE_REPOSITORY';

export interface ResponsableRepositoryPort {
  guardar(responsable: Responsable): Promise<Responsable>;
  buscarPorId(id: number): Promise<Responsable | null>;
  listarPorActividad(actividadId: number): Promise<Responsable[]>;
  eliminar(id: number): Promise<void>;
}