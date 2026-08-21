import { Injectable } from '@nestjs/common';
import { ProveedoresDto } from '../dto/crear-proveedores.dto';
import { ProveedoresRepositoryPort } from '../ports/proveedores.repository.port';

@Injectable()
export class ObtenerProveedoresUseCase {
  constructor(
    private readonly repository: ProveedoresRepositoryPort,
  ) {}

  async ejecutar(id: number): Promise<ProveedoresDto | null> {
    return this.repository.obtenerPorId(id);
  }
}