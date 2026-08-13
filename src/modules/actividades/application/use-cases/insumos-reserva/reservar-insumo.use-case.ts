import { Inject, Injectable } from '@nestjs/common';
import { ReservaInsumo } from '../../../domain/entities/reserva-insumo.entity';
import type { ReservaInsumoRepositoryPort } from '../../../domain/ports/reserva-insumo.repository.port';
import { RESERVA_INSUMO_REPOSITORY } from '../../../domain/ports/reserva-insumo.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface ReservarInsumoInput {
  actividadId: number;
  insumoId: number;
  cantidadReservada: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class ReservarInsumoUseCase {
  constructor(
    @Inject(RESERVA_INSUMO_REPOSITORY)
    private readonly repo: ReservaInsumoRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: ReservarInsumoInput): Promise<ReservaInsumo> {
    const reserva = ReservaInsumo.crear(input);
    const guardado = await this.repo.guardar(reserva);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Reserva de insumo',
      cambios: {
        insumoReservado: input.insumoId,
        cantidadReservada: input.cantidadReservada,
      },
    });

    return guardado;
  }
}