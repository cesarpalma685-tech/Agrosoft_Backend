import { Injectable } from "@nestjs/common";
import { UsuarioPermiso } from "../../domain/entities/usuarios_permisos.entity";
import { UsuarioPermisoRepository } from "../ports/usuarios_permisos.repository";

export interface CrearUsuarioPermisoInput {
  usuarioId: number;
  permisoId: number;
}

@Injectable()
export class CrearUsuarioPermisoUseCase {
  constructor(private readonly repository: UsuarioPermisoRepository) {}

  async ejecutar(datos: CrearUsuarioPermisoInput): Promise<UsuarioPermiso> {
    const usuarioPermiso = new UsuarioPermiso(
      null,
      datos.usuarioId,
      datos.permisoId,
    );

    return this.repository.crear(usuarioPermiso);
  }
}
