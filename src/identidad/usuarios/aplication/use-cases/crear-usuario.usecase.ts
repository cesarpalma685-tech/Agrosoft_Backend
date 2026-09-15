import { Injectable, ConflictException, Inject } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";
import { Usuario } from "../../domain/entities/usuario.entity";

export interface CrearUsuarioInput {
  nombre: string;
  apellido: string;
  identificacion: string;
  correo: string;
  password: string;
  idFicha: number;
  telefono?: string | null;
  programaFormacionId?: string | null;
}

@Injectable()
export class CrearUsuarioUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly repository: UsuarioRepository,
  ) {}

  async ejecutar(datos: CrearUsuarioInput): Promise<Usuario> {
    const existente = await this.repository.buscarPorCorreo(datos.correo);
    if (existente) {
      throw new ConflictException("Ya existe un usuario con ese correo");
    }

    const passwordHash = await bcrypt.hash(datos.password, 10);

    const usuario = new Usuario(
      null,
      datos.nombre,
      datos.apellido,
      datos.identificacion,
      datos.correo,
      passwordHash,
      datos.idFicha,
      datos.programaFormacionId ?? null,
      datos.telefono ?? null,
      "activo",
      null,
      null,
      new Date(),
    );

    return this.repository.crear(usuario);
  }
}
