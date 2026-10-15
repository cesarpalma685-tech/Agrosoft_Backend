import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { RolRepository } from "../ports/rol.repository";
import { Rol } from "../../domain/entities/rol.entity";
import { esRolNombre, RolNombre } from "../../domain/enums/rol-nombre.enum";

export interface CrearRolInput {
  nombre: RolNombre;
  descripcion: string;
  es_sistema: boolean;
}

@Injectable()
export class CrearRolUseCase {
  constructor(private readonly repository: RolRepository) {}

  async ejecutar(datos: CrearRolInput): Promise<Rol> {
    if (!esRolNombre(datos.nombre)) {
      throw new BadRequestException(`Rol no permitido: ${datos.nombre}`);
    }

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
