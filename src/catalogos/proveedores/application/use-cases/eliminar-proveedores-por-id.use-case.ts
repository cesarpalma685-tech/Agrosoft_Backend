import { Injectable } from "@nestjs/common";
import { ProveedoresRepositoryPort } from "../ports/proveedores.repository.port";

@Injectable()
export class EliminarProveedoresUseCase {
  constructor(private readonly repository: ProveedoresRepositoryPort) {}

  async ejecutar(id: number): Promise<boolean> {
    return this.repository.eliminar(id);
  }
}
