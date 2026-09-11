import { CategoriasDto } from "../../domain/entities/categorias.dto";
import { CategoriasRepositoryPort } from "../ports/categorias-repository.port";

export class ActualizarCategoriasUseCase {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryPort,
  ) {}

  async ejecutar(
    id: number,
    datos: Partial<CategoriasDto>,
  ): Promise<CategoriasDto | null> {
    return await this.categoriasRepository.actualizar(id, datos);
  }
}
