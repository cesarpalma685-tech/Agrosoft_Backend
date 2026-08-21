import { Injectable } from '@nestjs/common';
import { ProveedoresDto } from '../dto/crear-proveedores.dto';
import { ProveedoresRepositoryPort } from '../ports/proveedores.repository.port';

@Injectable()
export class ListarProveedoresUseCase {
  constructor(
    private readonly repository: ProveedoresRepositoryPort,
  ) {}

  async ejecutar(): Promise<ProveedoresDto[]> {
    return this.repository.listar();
  }
}