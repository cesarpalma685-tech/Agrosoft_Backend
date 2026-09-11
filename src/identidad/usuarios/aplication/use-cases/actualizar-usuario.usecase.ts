import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";
import { Usuario } from "../../domain/entities/usuario.entity";

export interface ActualizarUsuarioInput {
  nombre?: string;
  apellido?: string;
  telefono?: string | null;
  programaFormacionId?: string | null;
  estado?: string;
}

@Injectable()
export class ActualizarUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly repository: UsuarioRepository,
  ) {}

  async ejecutar(id: number, datos: ActualizarUsuarioInput): Promise<Usuario> {
    const usuario = await this.repository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }

    if (datos.nombre !== undefined) usuario.nombre = datos.nombre;
    if (datos.apellido !== undefined) usuario.apellido = datos.apellido;
    if (datos.telefono !== undefined) usuario.telefono = datos.telefono;
    if (datos.programaFormacionId !== undefined)
      usuario.programaFormacionId = datos.programaFormacionId;
    if (datos.estado !== undefined) usuario.estado = datos.estado;

    return this.repository.actualizar(usuario);
  }
}
