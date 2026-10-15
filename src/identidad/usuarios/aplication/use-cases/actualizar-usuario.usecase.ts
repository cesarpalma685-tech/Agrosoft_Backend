import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";
import { Usuario } from "../../domain/entities/usuario.entity";
import {
  esProgramaFormacionNombre,
  ProgramaFormacionNombre,
} from "../../../../formacion/programas-formacion/domain/enums/programa-formacion-nombre.enum";

export interface ActualizarUsuarioInput {
  nombre?: string;
  apellido?: string;
  telefono?: string | null;
  fotoPerfil?: string | null;
  programaFormacion?: ProgramaFormacionNombre | null;
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

    if (
      datos.programaFormacion != null &&
      !esProgramaFormacionNombre(datos.programaFormacion)
    ) {
      throw new BadRequestException(
        `Programa de formación no permitido: ${datos.programaFormacion}`,
      );
    }

    if (datos.nombre !== undefined) usuario.nombre = datos.nombre;
    if (datos.apellido !== undefined) usuario.apellido = datos.apellido;
    if (datos.telefono !== undefined) usuario.telefono = datos.telefono;
    if (datos.fotoPerfil !== undefined) usuario.fotoPerfil = datos.fotoPerfil;
    if (datos.programaFormacion !== undefined)
      usuario.programaFormacion = datos.programaFormacion;
    if (datos.estado !== undefined) usuario.estado = datos.estado;

    return this.repository.actualizar(usuario);
  }
}
