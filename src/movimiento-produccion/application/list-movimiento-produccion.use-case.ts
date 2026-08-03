import { Inject, Injectable } from '@nestjs/common';
import { MovimientoProduccion } from '../domain/movimiento-produccion.entity';
import type { MovimientoProduccionRepository } from '../domain/movimiento-produccion-repository.port';
import { MOVIMIENTO_PRODUCCION_REPOSITORY } from '../domain/movimiento-produccion-repository.port';

@Injectable()
export class ListMovimientoProduccionUseCase {
  constructor(
    @Inject(MOVIMIENTO_PRODUCCION_REPOSITORY)
    private readonly movimientoProduccionRepository: MovimientoProduccionRepository,
  ) {}

  async execute(): Promise<MovimientoProduccion[]> {
    return this.movimientoProduccionRepository.findAll();
  }
}