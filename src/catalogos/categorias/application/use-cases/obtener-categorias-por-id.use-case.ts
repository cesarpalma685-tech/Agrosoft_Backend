import { CategoriasDto } from "../../domain/entities/categorias.dto";
import { CategoriasRepositoryPort } from "../ports/categorias-repository.port";

export class ObtenerCategoriaUseCase {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<CategoriasDto | null> {
    return await this.categoriasRepository.buscarPorId(id);
  }
}
