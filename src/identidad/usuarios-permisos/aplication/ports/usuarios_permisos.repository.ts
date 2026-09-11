import { UsuarioPermiso } from "../../domain/entities/usuarios_permisos.entity";

export abstract class UsuarioPermisoRepository {
  abstract crear(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso>;
  abstract actualizar(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<UsuarioPermiso | null>;
}
