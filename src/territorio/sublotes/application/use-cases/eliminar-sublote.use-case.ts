
import { Injectable, NotFoundException } from '@nestjs/common';
import { SubloteRepositoryPort } from '../ports/sublote.repository.port';

@Injectable()
export class EliminarSubloteUseCase {
  constructor(
    private readonly subloteRepository: SubloteRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const sublote = await this.subloteRepository.findById(id);

    if (!sublote) {
      throw new NotFoundException(
        `El sublote con ID ${id} no existe para eliminar`,
      );
    }

    await this.subloteRepository.softDelete(id);
  }
}