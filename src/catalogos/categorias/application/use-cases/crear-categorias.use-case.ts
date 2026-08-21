import { CategoriasDto } from '../../domain/entities/categorias.dto';
import { CategoriasRepositoryPort } from '../ports/categorias-repository.port';

export class CrearCategoriasUseCase {
  constructor(
    private readonly categoriasRepository: CategoriasRepositoryPort,
  ) {}

  async ejecutar(categorias: CategoriasDto): Promise<CategoriasDto> {
    return await this.categoriasRepository.crear(categorias);
  }
}