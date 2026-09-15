import { Injectable } from "@nestjs/common";
import { InsumoRepositoryPort } from "../ports/insumo.repository.port";
import { Insumo } from "../../domain/entities/crear-insumo.dto";

@Injectable()
export class ListarInsumosUseCase {
  constructor(private readonly insumoRepository: InsumoRepositoryPort) {}
  async execute(): Promise<Insumo[]> {
    return await this.insumoRepository.findAll();
  }
}
