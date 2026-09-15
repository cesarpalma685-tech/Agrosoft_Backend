import { Injectable, NotFoundException } from "@nestjs/common";
import { RolPermisoRepository } from "../ports/rol_permisos.repository";

@Injectable()
export class EliminarRolPermisoUseCase {
  constructor(private readonly repository: RolPermisoRepository) {}

  async ejecutar(id: number): Promise<void> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException("Rol permiso no encontrado");
    }

    await this.repository.eliminar(id);
  }
}
