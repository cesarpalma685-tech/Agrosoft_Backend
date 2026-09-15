import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioPermisoRepository } from "../ports/usuarios_permisos.repository";

@Injectable()
export class EliminarUsuarioPermisoUseCase {
  constructor(private readonly repository: UsuarioPermisoRepository) {}

  async ejecutar(id: number): Promise<void> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException("Usuario permiso no encontrado");
    }

    await this.repository.eliminar(id);
  }
}
