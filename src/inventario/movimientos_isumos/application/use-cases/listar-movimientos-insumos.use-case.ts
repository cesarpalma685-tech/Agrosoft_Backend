import { Injectable } from "@nestjs/common";
import { MovimientoInsumo } from "../../domain/entities/movimiento-insumo.entity";
import { MovimientoInsumoRepositoryPort } from "../ports/crear-movimiento-insumo.repository.port";

@Injectable()
export class ListarMovimientosInsumosUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  async execute(): Promise<MovimientoInsumo[]> {
    return await this.movimientoRepository.findAll();
  }
}
