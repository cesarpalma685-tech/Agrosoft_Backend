import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";
import { Usuario } from "../../domain/entities/usuario.entity";
import { RolRepository } from "../../../roles/aplication/ports/rol.repository";
import {
  esRolNombre,
  RolNombre,
} from "../../../roles/domain/enums/rol-nombre.enum";
import {
  esProgramaFormacionNombre,
  ProgramaFormacionNombre,
} from "../../../../formacion/programas-formacion/domain/enums/programa-formacion-nombre.enum";

export interface CrearUsuarioInput {
  nombre: string;
  apellido: string;
  identificacion: string;
  correo: string;
  password: string;
  idFicha?: number | null;
  telefono?: string | null;
  fotoPerfil?: string | null;
  programaFormacion?: ProgramaFormacionNombre | null;
  rol?: RolNombre;
}

export interface CrearUsuarioOpciones {
  // Solo el seeder puede crear administradores
  permitirAdministrador?: boolean;
}

@Injectable()
export class CrearUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly repository: UsuarioRepository,
    private readonly rolRepository: RolRepository,
  ) {}

  async ejecutar(
    datos: CrearUsuarioInput,
    opciones: CrearUsuarioOpciones = {},
  ): Promise<Usuario> {
    const rolNombre = datos.rol ?? RolNombre.APRENDIZ;

    if (!esRolNombre(rolNombre)) {
      throw new BadRequestException(`Rol no permitido: ${rolNombre}`);
    }
    if (
      rolNombre === RolNombre.ADMINISTRADOR &&
      !opciones.permitirAdministrador
    ) {
      throw new ForbiddenException(
        "El rol Administrador no se puede asignar desde el registro",
      );
    }

    const programaFormacion = datos.programaFormacion ?? null;
    if (
      programaFormacion !== null &&
      !esProgramaFormacionNombre(programaFormacion)
    ) {
      throw new BadRequestException(
        `Programa de formación no permitido: ${programaFormacion}`,
      );
    }
    if (rolNombre === RolNombre.APRENDIZ && programaFormacion === null) {
      throw new BadRequestException(
        "El programa de formación es obligatorio para un Aprendiz",
      );
    }

    const existente = await this.repository.buscarPorCorreo(datos.correo);
    if (existente) {
      throw new ConflictException("Ya existe un usuario con ese correo");
    }

    const rol = await this.rolRepository.buscarPorNombre(rolNombre);
    if (!rol) {
      throw new InternalServerErrorException(
        `El rol ${rolNombre} no existe en la base de datos (¿corrió el seeder?)`,
      );
    }

    const passwordHash = await bcrypt.hash(datos.password, 10);

    const usuario = new Usuario(
      null,
      datos.nombre,
      datos.apellido,
      datos.identificacion,
      datos.correo,
      passwordHash,
      datos.idFicha ?? null,
      programaFormacion,
      datos.telefono ?? null,
      "activo",
      null,
      null,
      new Date(),
      rol.id,
      datos.fotoPerfil ?? null,
    );

    return this.repository.crear(usuario);
  }
}
