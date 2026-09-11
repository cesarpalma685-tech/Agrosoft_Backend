import { Injectable, NotFoundException } from "@nestjs/common";
import { RolRepository } from "../ports/rol.repository";
import { Rol } from "../../domain/entities/rol.entity";

export interface ActualizarRolInput {
  nombre?: string;
  descripcion?: string;
  es_sistema?: boolean;
  estado?: string;
}

@Injectable()
export class ActualizarRolUseCase {
  constructor(private readonly repository: RolRepository) {}

  async ejecutar(id: number, datos: ActualizarRolInput): Promise<Rol> {
    const rol = await this.repository.buscarPorId(id);

    if (!rol) {
      throw new NotFoundException("Rol no encontrado");
    }

    const rolActualizado = new Rol(
      rol.id,
      datos.nombre ?? rol.nombre,
      datos.descripcion ?? rol.descripcion,
      datos.es_sistema ?? rol.es_sistema,
      datos.estado ?? rol.estado,
    );

    return this.repository.actualizar(rolActualizado);
  }
}
