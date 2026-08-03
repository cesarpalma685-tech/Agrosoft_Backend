import { Inject, Injectable } from '@nestjs/common';
import { LoteProduccion } from '../domain/lote-produccion.entity';
import type { LoteProduccionRepository } from '../domain/lote-produccion-repository.port';
import { LOTE_PRODUCCION_REPOSITORY } from '../domain/lote-produccion-repository.port';

@Injectable()
export class ListLoteProduccionUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly loteProduccionRepository: LoteProduccionRepository,
  ) {}

  async execute(): Promise<LoteProduccion[]> {
    return this.loteProduccionRepository.findAll();
  }
}