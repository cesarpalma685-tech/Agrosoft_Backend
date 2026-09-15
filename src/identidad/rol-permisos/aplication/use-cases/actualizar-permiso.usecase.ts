import { Injectable, NotFoundException } from "@nestjs/common";
import { RolPermisoRepository } from "../ports/rol_permisos.repository";
import { RolPermiso } from "../../domain/entities/rol_permisos.entity";

export interface ActualizarRolPermisoInput {
  rolId?: number;
  permisoId?: number;
}

@Injectable()
export class ActualizarRolPermisoUseCase {
  constructor(private readonly repository: RolPermisoRepository) {}

  async ejecutar(
    id: number,
    datos: ActualizarRolPermisoInput,
  ): Promise<RolPermiso> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException("Rol permiso no encontrado");
    }

    const rolPermiso = new RolPermiso(
      existente.id,
      datos.rolId ?? existente.rolId,
      datos.permisoId ?? existente.permisoId,
      existente.createdAt,
    );

    return this.repository.actualizar(rolPermiso);
  }
}
