import { Injectable } from '@nestjs/common';
import { ActividadInsumoReservaRepositoryPort } from '../ports/actividad-insumo-reserva.repository.port';
import { ActividadInsumoReserva } from '../../domain/entities/actividad-insumo-reserva.entity';

@Injectable()
export class ListarInsumosReservaPorActividadUseCase {
  constructor(
    private readonly actividadInsumoReservaRepository: ActividadInsumoReservaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ActividadInsumoReserva[]> {
    return await this.actividadInsumoReservaRepository.findByActividadId(actividadId);
  }
}
