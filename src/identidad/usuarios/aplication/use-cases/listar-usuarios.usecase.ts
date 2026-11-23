import { Inject, Injectable } from "@nestjs/common";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";
import { RolRepository } from "../../../roles/aplication/ports/rol.repository";
import { ROL_NOMBRE_LABELS } from "../../../roles/domain/enums/rol-nombre.enum";

@Injectable()
export class ListarUsuariosUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly rolRepository: RolRepository,
  ) {}

  // Solo datos públicos: nunca el hash de la contraseña.
  async ejecutar() {
    const usuarios = await this.usuarioRepository.listar();
    const roles = new Map<number, { nombre: string; label: string } | null>();

    for (const rolId of new Set(usuarios.map((u) => u.rolId))) {
      if (rolId == null) continue;
      const rol = await this.rolRepository.buscarPorId(rolId);
      roles.set(
        rolId,
        rol ? { nombre: rol.nombre, label: ROL_NOMBRE_LABELS[rol.nombre] } : null,
      );
    }

    return usuarios.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      apellido: u.apellido,
      correo: u.correo,
      telefono: u.telefono,
      identificacion: u.identificacion,
      estado: u.estado,
      rol: u.rolId != null ? (roles.get(u.rolId)?.nombre ?? null) : null,
      rolLabel: u.rolId != null ? (roles.get(u.rolId)?.label ?? null) : null,
    }));
  }
}
