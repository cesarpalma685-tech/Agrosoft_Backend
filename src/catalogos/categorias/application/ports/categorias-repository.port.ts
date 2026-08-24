import { CategoriasDto } from '../../domain/entities/categorias.dto';

export abstract class CategoriasRepositoryPort {
  abstract crear(categoria: CategoriasDto): Promise<CategoriasDto>;

  abstract listar(): Promise<CategoriasDto[]>;

  abstract buscarPorId(id: number): Promise<CategoriasDto | null>;

  abstract actualizar(
    id: number,
    datos: Partial<CategoriasDto>,
  ): Promise<CategoriasDto| null>;

  abstract eliminar(id: number): Promise<boolean>;
}