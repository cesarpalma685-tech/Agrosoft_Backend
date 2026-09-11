import { CategoriasDto } from "../../domain/entities/categorias.dto";
import { CategoriasRepositoryPort } from "../ports/categorias-repository.port";

export class ListarCategoriasUseCase {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryPort,
  ) {}

  async ejecutar(): Promise<CategoriasDto[]> {
    return await this.categoriasRepository.listar();
  }
}
