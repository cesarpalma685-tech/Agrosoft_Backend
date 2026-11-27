import { Injectable } from "@nestjs/common";
import { CategoriasRepositoryPort } from "../ports/categorias-repository.port";

@Injectable()
export class EliminarCategoriaUseCase {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<boolean> {
    return await this.categoriasRepository.eliminar(id);
  }
}
