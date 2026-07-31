import { Injectable, NotFoundException } from '@nestjs/common';
import { AlmacenRepositoryPort } from '../ports/almacen.repository.port';

@Injectable()
export class EliminarAlmacenUseCase {
  constructor(private readonly almacenRepository: AlmacenRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const existe = await this.almacenRepository.findById(id);
    if (!existe) {
      throw new NotFoundException(`El almacén con ID ${id} no existe`);
    }
    await this.almacenRepository.softDelete(id);
  }
}