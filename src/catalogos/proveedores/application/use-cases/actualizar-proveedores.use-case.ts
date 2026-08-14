import { Injectable } from '@nestjs/common';
import { ProveedoresDto } from '../dto/crear-proveedores.dto';
import { ProveedoresRepositoryPort } from '../ports/proveedores.repository.port';

@Injectable()
export class ActualizarProveedoresUseCase {
  constructor(
    private readonly repository: ProveedoresRepositoryPort,
  ) {}

  async ejecutar(
    id: number,
    datos: Partial<ProveedoresDto>,
  ): Promise<ProveedoresDto | null> {
    return this.repository.actualizar(id, datos);
  }
}