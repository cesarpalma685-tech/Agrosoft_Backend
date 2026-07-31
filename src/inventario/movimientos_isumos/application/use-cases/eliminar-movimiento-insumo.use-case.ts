import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientoInsumoRepositoryPort } from '../ports/crear-movimiento-insumo.repository.port';

@Injectable()
export class EliminarMovimientoInsumoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    const existe = await this.movimientoRepository.findById(id);

    if (!existe) {
      throw new NotFoundException(`El movimiento con ID ${id} no existe para eliminar`);
    }

    await this.movimientoRepository.softDelete(id);
  }
}