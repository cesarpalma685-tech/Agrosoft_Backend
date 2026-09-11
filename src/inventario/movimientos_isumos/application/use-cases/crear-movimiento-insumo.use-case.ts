import { Injectable } from "@nestjs/common";
import { MovimientoInsumoRepositoryPort } from "../ports/crear-movimiento-insumo.repository.port";

import { MovimientoInsumo } from "../../domain/entities/movimiento-insumo.entity";
import { CrearMovimientoIsumoDto } from "../dto/crear-movimiento-insumo.dto";

@Injectable()
export class RegistrarMovimientoInsumoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  async execute(dto: CrearMovimientoIsumoDto): Promise<MovimientoInsumo> {
    const movimiento = new MovimientoInsumo();
    Object.assign(movimiento, dto);

    // Si no envían el costo total, lo calculamos automáticamente
    if (!movimiento.costoTotal && movimiento.costoUnitarioPresentacion) {
      movimiento.costoTotal =
        movimiento.cantidadPresentacion * movimiento.costoUnitarioPresentacion;
    }

    return await this.movimientoRepository.save(movimiento);
  }
}
