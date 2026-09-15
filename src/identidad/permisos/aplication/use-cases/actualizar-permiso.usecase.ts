import { Injectable, NotFoundException } from "@nestjs/common";
import { Permiso } from "../../domain/entities/permisos.entity";
import { PermisoRepository } from "../ports/permisos.repository";

export interface ActualizarPermisoInput {
  modulo?: string;
  accion?: string;
  clave?: string;
}

@Injectable()
export class ActualizarPermisoUseCase {
  constructor(private readonly repository: PermisoRepository) {}

  async ejecutar(id: number, datos: ActualizarPermisoInput): Promise<Permiso> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException("Permiso no encontrado");
    }

    const permiso = new Permiso(
      existente.id,
      datos.modulo ?? existente.modulo,
      datos.accion ?? existente.accion,
      datos.clave ?? existente.clave,
      existente.createdAt,
    );

    return this.repository.actualizar(permiso);
  }
}
