import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RolRepository } from "../ports/rol.repository";

@Injectable()
export class EliminarRolUseCase {
  constructor(private readonly repository: RolRepository) {}

  async ejecutar(id: number): Promise<void> {
    const rol = await this.repository.buscarPorId(id);

    if (!rol) {
      throw new NotFoundException("Rol no encontrado");
    }

    if (rol.es_sistema) {
      throw new ForbiddenException("Los roles del sistema no se pueden eliminar");
    }

    await this.repository.eliminar(id);
  }
}
