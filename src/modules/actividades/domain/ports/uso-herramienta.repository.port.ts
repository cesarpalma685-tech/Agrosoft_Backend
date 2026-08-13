import { UsoHerramienta } from '../entities/uso-herramienta.entity';

export const USO_HERRAMIENTA_REPOSITORY = 'USO_HERRAMIENTA_REPOSITORY';

export interface UsoHerramientaRepositoryPort {
  guardar(uso: UsoHerramienta): Promise<UsoHerramienta>;
  buscarPorId(id: number): Promise<UsoHerramienta | null>;
  listarPorActividad(actividadId: number): Promise<UsoHerramienta[]>;
  eliminar(id: number): Promise<void>;
}