import { Inject, Injectable } from '@nestjs/common';
import type {
  HistorialLoggerPort,
  RegistroHistorial,
} from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

@Injectable()
export class ListarHistorialPorActividadUseCase {
  constructor(
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(actividadId: number): Promise<RegistroHistorial[]> {
    return this.historial.listarPorActividad(actividadId);
  }
}