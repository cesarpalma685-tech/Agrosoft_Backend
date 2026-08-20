import { Evidencia } from '../entities/evidencia.entity';

export const EVIDENCIA_REPOSITORY = 'EVIDENCIA_REPOSITORY';

export interface EvidenciaRepositoryPort {
  guardar(evidencia: Evidencia): Promise<Evidencia>;
  buscarPorId(id: number): Promise<Evidencia | null>;
  listarPorActividad(actividadId: number): Promise<Evidencia[]>;
  eliminar(id: number): Promise<void>;
}