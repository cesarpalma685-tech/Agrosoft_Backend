import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientoInsumo } from '../../domain/entities/movimiento-insumo.entity';
import { MovimientoInsumoRepositoryPort } from '../ports/crear-movimiento-insumo.repository.port';

@Injectable()
export class ObtenerMovimientoInsumoPorIdUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  async execute(id: number): Promise<MovimientoInsumo> {
    const movimiento = await this.movimientoRepository.findById(id);

    if (!movimiento) {
      throw new NotFoundException(`El movimiento con ID ${id} no fue encontrado`);
    }

    return movimiento;
  }
}