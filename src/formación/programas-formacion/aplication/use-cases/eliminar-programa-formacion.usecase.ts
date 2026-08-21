import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgramaFormacionRepository } from '../ports/programa-formacion.repository';

@Injectable()
export class EliminarProgramaFormacionUseCase {
  constructor(
    private readonly repository: ProgramaFormacionRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {

    const programa = await this.repository.buscarPorId(id);

    if (!programa) {
      throw new NotFoundException(
        'Programa de formación no encontrado',
      );
    }

    await this.repository.eliminar(id);
  }
}