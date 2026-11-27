import { Injectable } from "@nestjs/common";
import { CategoriasDto } from "../../domain/entities/categorias.dto";
import { CategoriasRepositoryPort } from "../ports/categorias-repository.port";

@Injectable()
export class ListarCategoriasUseCase {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryPort,
  ) {}

  async ejecutar(): Promise<CategoriasDto[]> {
    return await this.categoriasRepository.listar();
  }
}
