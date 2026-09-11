import { Injectable } from "@nestjs/common";
import { ProductosAgroDto } from "../dto/crear-productos_agro.dto";
import { ProductosAgroRepositoryPort } from "../ports/productos_agro-repository.port";

@Injectable()
export class ActualizarProductosAgroUseCase {
  constructor(private readonly repository: ProductosAgroRepositoryPort) {}

  async ejecutar(
    id: number,
    datos: Partial<ProductosAgroDto>,
  ): Promise<ProductosAgroDto | null> {
    return this.repository.actualizar(id, datos);
  }
}
