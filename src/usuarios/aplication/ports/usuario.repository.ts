import { Usuario } from './usuario.entity';

export const USUARIO_REPOSITORY = 'USUARIO_REPOSITORY';

export abstract class UsuarioRepository {
  abstract crear(usuario: Usuario): Promise<Usuario>;
  abstract actualizar(usuario: Usuario): Promise<Usuario>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<Usuario | null>;
  abstract buscarPorCorreo(correo: string): Promise<Usuario | null>;
}