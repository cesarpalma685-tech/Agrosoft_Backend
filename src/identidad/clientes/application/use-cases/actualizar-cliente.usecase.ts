import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteRepository } from '../../domain/cliente.repository';
import { Cliente } from '../../domain/cliente.entity';

export interface ActualizarClienteInput {
  nombre?: string;
  identificacion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

@Injectable()
export class ActualizarClienteUseCase {
  constructor(
    private readonly repository: ClienteRepository,
  ) {}

  async ejecutar(
    id: number,
    datos: ActualizarClienteInput,
  ): Promise<Cliente> {
    const cliente = await this.repository.buscarPorId(id);

    if (!cliente) {
      throw new NotFoundException(
        'Cliente no encontrado',
      );
    }

    const actualizado = new Cliente(
      cliente.id,
      datos.nombre ?? cliente.nombre,
      datos.identificacion ?? cliente.identificacion,
      datos.telefono ?? cliente.telefono,
      datos.email ?? cliente.email,
      datos.direccion ?? cliente.direccion,
      datos.notas ?? cliente.notas,
      cliente.createdAt,
    );

    return this.repository.actualizar(actualizado);
  }
}