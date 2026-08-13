import { Inject, Injectable } from '@nestjs/common';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface RegistrarHistorialInput {
  actividadId: number;
  motivo: string;
  cambios: Record<string, any>;
  usuarioQueRegistraId: number;
}

@Injectable()
export class RegistrarHistorialUseCase {
  constructor(
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: RegistrarHistorialInput): Promise<void> {
    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: input.motivo,
      cambios: input.cambios,
    });
  }
}