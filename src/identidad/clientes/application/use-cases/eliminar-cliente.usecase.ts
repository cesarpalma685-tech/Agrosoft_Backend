import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteRepository } from '../../domain/cliente.repository';

@Injectable()
export class EliminarClienteUseCase {
  constructor(
    private readonly repository: ClienteRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const cliente = await this.repository.buscarPorId(id);

    if (!cliente) {
      throw new NotFoundException(
        'Cliente no encontrado',
      );
    }

    await this.repository.eliminar(id);
  }
}