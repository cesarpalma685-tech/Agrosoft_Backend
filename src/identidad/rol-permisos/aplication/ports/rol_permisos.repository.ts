import { RolPermiso } from "../../domain/entities/rol_permisos.entity";

export abstract class RolPermisoRepository {
  abstract crear(rolPermiso: RolPermiso): Promise<RolPermiso>;
  abstract actualizar(rolPermiso: RolPermiso): Promise<RolPermiso>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<RolPermiso | null>;
}
