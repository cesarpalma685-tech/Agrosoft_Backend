import { Servicio } from '../entities/servicio.entity';

export const SERVICIO_REPOSITORY = 'SERVICIO_REPOSITORY';

export interface ServicioRepositoryPort {
  guardar(servicio: Servicio): Promise<Servicio>;
  buscarPorId(id: number): Promise<Servicio | null>;
  listarPorActividad(actividadId: number): Promise<Servicio[]>;
  eliminar(id: number): Promise<void>;
}