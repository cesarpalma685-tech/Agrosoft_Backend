import { Injectable, NotFoundException } from "@nestjs/common";
import { AlmacenRepositoryPort } from "../ports/almacen.repository.port";
import { Almacen } from "../../domain/entities/crear-almacen.dto";

@Injectable()
export class ObtenerAlmacenPorIdUseCase {
  constructor(private readonly almacenRepository: AlmacenRepositoryPort) {}

  async execute(id: number): Promise<Almacen> {
    const almacen = await this.almacenRepository.findById(id);
    if (!almacen) {
      throw new NotFoundException(`El almacén con ID ${id} no fue encontrado`);
    }
    return almacen;
  }
}
