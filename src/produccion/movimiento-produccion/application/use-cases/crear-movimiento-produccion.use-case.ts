import { Injectable, BadRequestException } from '@nestjs/common';
import { MovimientoProduccionRepositoryPort } from '../ports/movimiento-produccion.repository.port';
import { CrearMovimientoProduccionDto } from '../dto/crear-movimiento-produccion.dto';
import { MovimientoProduccion } from '../../domain/entities/movimiento-produccion.entity';

@Injectable()
export class CrearMovimientoProduccionUseCase {
  constructor(private readonly movimientoProduccionRepository: MovimientoProduccionRepositoryPort) {}

  async execute(dto: CrearMovimientoProduccionDto): Promise<MovimientoProduccion> {
    const nuevo = new MovimientoProduccion();
    Object.assign(nuevo, dto);
    nuevo.fecha = dto.fecha ? new Date(dto.fecha) : new Date();

    if (nuevo.tipo === 'salida') {
      const stockDisponible = await this.movimientoProduccionRepository.getStockDisponible(
        nuevo.loteProduccionId,
      );
      if (stockDisponible == null) {
        throw new BadRequestException('El lote de producción no existe');
      }
      if (nuevo.cantidadKg > stockDisponible) {
        throw new BadRequestException(
          `No hay suficiente stock: disponible ${stockDisponible}kg, se intentó mover ${nuevo.cantidadKg}kg`,
        );
      }
    }

    const guardado = await this.movimientoProduccionRepository.save(nuevo);

    const delta = nuevo.tipo === 'salida' ? -nuevo.cantidadKg : nuevo.cantidadKg;
    await this.movimientoProduccionRepository.descontarStock(nuevo.loteProduccionId, delta);

    return guardado;
  }
}