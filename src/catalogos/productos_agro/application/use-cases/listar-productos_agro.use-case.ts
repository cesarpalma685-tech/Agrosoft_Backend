import { Injectable } from '@nestjs/common';
import { ProductosAgroDto } from '../dto/crear-productos_agro.dto';
import { ProductosAgroRepositoryPort } from '../ports/productos_agro-repository.port';

@Injectable()
export class ListarProductosAgroUseCase {
  constructor(
    private readonly repository: ProductosAgroRepositoryPort,
  ) {}

  async ejecutar(): Promise<ProductosAgroDto[]> {
    return this.repository.listar();
  }
}