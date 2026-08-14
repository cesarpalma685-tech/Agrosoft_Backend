import { Injectable } from '@nestjs/common';
import { ProveedoresDto } from '../dto/crear-proveedores.dto';
import { ProveedoresRepositoryPort } from '../ports/proveedores.repository.port';

@Injectable()
export class CrearProveedoresUseCase {
  constructor(
    private readonly repository: ProveedoresRepositoryPort,
  ) {}

  async ejecutar(proveedor: ProveedoresDto): Promise<ProveedoresDto> {
    return this.repository.crear(proveedor);
  }
}