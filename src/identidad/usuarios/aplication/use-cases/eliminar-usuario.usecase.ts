import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../ports/usuario.repository';

@Injectable()
export class EliminarUsuarioUseCase {
  constructor(private readonly repository: UsuarioRepository) {}

  async ejecutar(id: number): Promise<void> {
    const usuario = await this.repository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }

    await this.repository.eliminar(id);
  }
}