import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientoInsumoRepositoryPort } from '../ports/crear-movimiento-insumo.repository.port';
import { MovimientoInsumo } from '../../domain/entities/movimiento-insumo.entity';
import { CrearMovimientoIsumoDto } from '../dto/crear-movimiento-insumo.dto';

@Injectable()
export class ActualizarMovimientoInsumoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  async execute(
    id: number,
    dto: Partial<CrearMovimientoIsumoDto>,
  ): Promise<MovimientoInsumo> {
    const existe = await this.movimientoRepository.findById(id);

    if (!existe) {
      throw new NotFoundException(`El movimiento con ID ${id} no existe`);
    }

    return await this.movimientoRepository.update(id, dto as Partial<MovimientoInsumo>);
  }
}