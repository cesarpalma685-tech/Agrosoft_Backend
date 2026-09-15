import { Injectable, NotFoundException } from "@nestjs/common";
import { PermisoRepository } from "../ports/permisos.repository";

@Injectable()
export class EliminarPermisoUseCase {
  constructor(private readonly repository: PermisoRepository) {}

  async ejecutar(id: number): Promise<void> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException("Permiso no encontrado");
    }

    await this.repository.eliminar(id);
  }
}
