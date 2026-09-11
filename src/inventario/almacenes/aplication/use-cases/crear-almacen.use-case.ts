import { Injectable } from "@nestjs/common";
import { AlmacenRepositoryPort } from "../ports/almacen.repository.port";
import { CrearAlmacenDto } from "../dto/crear-almacen.dto";
import { Almacen } from "../../domain/entities/crear-almacen.dto";

@Injectable()
export class CrearAlmacenUseCase {
  constructor(private readonly almacenRepository: AlmacenRepositoryPort) {}

  async execute(dto: CrearAlmacenDto): Promise<Almacen> {
    const almacen = new Almacen();
    // 🔴 ASIGNACIÓN EXPLÍCITA O CON OBJECT.ASSIGN:
    almacen.nombre = dto.nombre;
    almacen.descripcion = dto.descripcion;
    almacen.ubicacion = dto.ubicacion;

    return await this.almacenRepository.save(almacen);
  }
}
