import { Injectable, ConflictException } from "@nestjs/common";
import { RolRepository } from "../ports/rol.repository";
import { Rol } from "../../domain/entities/rol.entity";

export interface CrearRolInput {
  nombre: string;
  descripcion: string;
  es_sistema: boolean;
}

@Injectable()
export class CrearRolUseCase {
  constructor(private readonly repository: RolRepository) {}

  async ejecutar(datos: CrearRolInput): Promise<Rol> {
    const existente = await this.repository.buscarPorNombre(datos.nombre);
    if (existente) {
      throw new ConflictException("Ya existe un rol con ese nombre");
    }

    const rol = new Rol(
      null,
      datos.nombre,
      datos.descripcion,
      datos.es_sistema,
      "activo",
    );

    return this.repository.crear(rol);
  }
}
