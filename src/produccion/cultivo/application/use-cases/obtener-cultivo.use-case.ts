import { Injectable, NotFoundException } from "@nestjs/common";
import { CultivoRepositoryPort } from "../ports/cultivo.repository.port";
import { Cultivo } from "../../domain/entities/cultivo.entity";

@Injectable()
export class ObtenerCultivoUseCase {
  constructor(private readonly cultivoRepository: CultivoRepositoryPort) {}

  async execute(id: number): Promise<Cultivo> {
    const cultivo = await this.cultivoRepository.findById(id);
    if (!cultivo) throw new NotFoundException(`El cultivo con ID ${id} no existe`);
    return cultivo;
  }
}
