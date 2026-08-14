import { ProductosAgroDto } from '../dto/crear-productos_agro.dto';

export abstract class ProductosAgroRepositoryPort {
  abstract crear(producto: ProductosAgroDto): Promise<ProductosAgroDto>;

  abstract listar(): Promise<ProductosAgroDto[]>;

  abstract obtenerPorId(id: number): Promise<ProductosAgroDto | null>;

  abstract actualizar(
    id: number,
    producto: Partial<ProductosAgroDto>,
  ): Promise<ProductosAgroDto | null>;

  abstract eliminar(id: number): Promise<boolean>;
}