import { Inject, Injectable } from '@nestjs/common';
import { LoteProduccion } from '../domain/lote-produccion.entity';
import type { LoteProduccionRepository } from '../domain/lote-produccion-repository.port';
import { LOTE_PRODUCCION_REPOSITORY } from '../domain/lote-produccion-repository.port';

@Injectable()
export class CreateLoteProduccionUseCase {
  constructor(
    @Inject(LOTE_PRODUCCION_REPOSITORY)
    private readonly loteProduccionRepository: LoteProduccionRepository,
  ) {}

  async execute(input: {
    productoAgroId?: number;
    cultivoId: number;
    loteId: number;
    subLoteId?: number;
    actividadCosechaId?: number;
    calidad?: string;
    cantidadKg: number;
    stockDisponibleKg?: number;
    costoUnitarioKg?: number;
    costoTotal?: number;
    precioSugeridoKg?: number;
  }): Promise<LoteProduccion> {
    const loteProduccion = LoteProduccion.create(input);
    return this.loteProduccionRepository.save(loteProduccion);
  }
}