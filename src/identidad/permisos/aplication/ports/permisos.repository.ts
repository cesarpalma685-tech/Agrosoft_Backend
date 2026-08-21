import { Permiso } from '../../domain/entities/permisos.entity';

export abstract class PermisoRepository {
  abstract crear(permiso: Permiso): Promise<Permiso>;
  abstract actualizar(permiso: Permiso): Promise<Permiso>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<Permiso | null>;
}