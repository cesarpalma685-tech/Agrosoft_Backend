import { Injectable } from '@nestjs/common';
import { Cliente } from '../../domain/entities/cliente.entity';
import { ClienteRepository } from '../ports/cliente.repository';

export interface CrearClienteInput {
  nombre: string;
  identificacion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

@Injectable()
export class CrearClienteUseCase {
  constructor(
    private readonly repository: ClienteRepository,
  ) {}

  async ejecutar(datos: CrearClienteInput): Promise<Cliente> {
    const cliente = new Cliente(
      null,
      datos.nombre,
      datos.identificacion,
      datos.telefono,
      datos.email,
      datos.direccion,
      datos.notas,
      new Date(),
    );

    return this.repository.crear(cliente);
  }
}