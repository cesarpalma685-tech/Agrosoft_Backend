import { Injectable } from '@nestjs/common';
import { ActividadInsumoReservaRepositoryPort } from '../ports/actividad-insumo-reserva.repository.port';
import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';
import { ReservarActividadInsumoDto } from '../dto/actividad_insumo_reserva.dto';

@Injectable()
export class ReservarInsumoUseCase {
  constructor(
    private readonly actividadInsumoReservaRepository: ActividadInsumoReservaRepositoryPort,
  ) {}

  async execute(dto: ReservarActividadInsumoDto): Promise<ActividadInsumoReserva> {
    const nuevaReserva = new ActividadInsumoReserva();
    Object.assign(nuevaReserva, dto);
    return await this.actividadInsumoReservaRepository.save(nuevaReserva);
  }
}
