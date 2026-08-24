import { Injectable } from '@nestjs/common';
import { MovimientoProduccionRepositoryPort } from '../ports/movimiento-produccion.repository.port';
import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';

@Injectable()
export class ListarMovimientoProduccionUseCase {
  constructor(private readonly movimientoProduccionRepository: MovimientoProduccionRepositoryPort) {}

  async execute(): Promise<MovimientoProduccion[]> {
    return await this.movimientoProduccionRepository.findAll();
  }
}