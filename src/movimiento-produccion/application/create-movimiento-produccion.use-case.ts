import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { MovimientoProduccion } from '../domain/movimiento-produccion.entity';
import type { MovimientoProduccionRepository } from '../domain/movimiento-produccion-repository.port';
import { MOVIMIENTO_PRODUCCION_REPOSITORY } from '../domain/movimiento-produccion-repository.port';

@Injectable()
export class CreateMovimientoProduccionUseCase {
  constructor(
    @Inject(MOVIMIENTO_PRODUCCION_REPOSITORY)
    private readonly movimientoProduccionRepository: MovimientoProduccionRepository,
  ) {}

  async execute(input: {
    loteProduccionId: number;
    tipo: string;
    cantidadKg: number;
    costoUnitarioKg?: number;
    costoTotal?: number;
    ventaId?: number;
    descripcion?: string;
    usuarioId?: number;
    fecha?: string;
  }): Promise<MovimientoProduccion> {
    const movimiento = MovimientoProduccion.create(input);

    if (movimiento.tipo === 'salida') {
      const stockDisponible = await this.movimientoProduccionRepository.getStockDisponible(
        movimiento.loteProduccionId,
      );
      if (stockDisponible == null) {
        throw new BadRequestException('El lote de producción no existe');
      }
      if (movimiento.cantidadKg > stockDisponible) {
        throw new BadRequestException(
          `No hay suficiente stock: disponible ${stockDisponible}kg, se intentó mover ${movimiento.cantidadKg}kg`,
        );
      }
    }

    const saved = await this.movimientoProduccionRepository.save(movimiento);

    const delta = movimiento.tipo === 'salida' ? -movimiento.cantidadKg : movimiento.cantidadKg;
    await this.movimientoProduccionRepository.descontarStock(movimiento.loteProduccionId, delta);

    return saved;
  }
}