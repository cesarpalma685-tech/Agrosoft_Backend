import { UsoInsumo } from '../entities/uso-insumo.entity';

export const USO_INSUMO_REPOSITORY = 'USO_INSUMO_REPOSITORY';

export interface UsoInsumoRepositoryPort {
  guardar(uso: UsoInsumo): Promise<UsoInsumo>;
  buscarPorId(id: number): Promise<UsoInsumo | null>;
  listarPorActividad(actividadId: number): Promise<UsoInsumo[]>;
  eliminar(id: number): Promise<void>;
}