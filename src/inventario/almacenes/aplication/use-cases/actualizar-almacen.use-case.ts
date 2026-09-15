import { Injectable, NotFoundException } from "@nestjs/common";
import { AlmacenRepositoryPort } from "../ports/almacen.repository.port";
import { Almacen } from "../../domain/entities/crear-almacen.dto";

@Injectable()
export class ActualizarAlmacenUseCase {
  constructor(private readonly almacenRepository: AlmacenRepositoryPort) {}

  async execute(id: number, dto: Partial<Almacen>): Promise<Almacen> {
    const existe = await this.almacenRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El almacén con ID ${id} no existe`);
    }
    return await this.almacenRepository.update(id, dto);
  }
}
