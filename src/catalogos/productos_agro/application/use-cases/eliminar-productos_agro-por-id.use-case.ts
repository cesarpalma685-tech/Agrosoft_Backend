import { Injectable } from '@nestjs/common';
import { ProductosAgroRepositoryPort } from '../ports/productos_agro-repository.port';

@Injectable()
export class EliminarProductosAgroUseCase {
  constructor(
    private readonly repository: ProductosAgroRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<boolean> {
    return this.repository.eliminar(id);
  }
}