import { Inject, Injectable } from '@nestjs/common';
import { HerramientaAsignada } from '../../../domain/entities/herramienta-asignada.entity';
import type { HerramientaAsignadaRepositoryPort } from '../../../domain/ports/herramienta-asignada.repository.port';
import { HERRAMIENTA_ASIGNADA_REPOSITORY } from '../../../domain/ports/herramienta-asignada.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface AsignarHerramientaInput {
  actividadId: number;
  activoFijoId: number;
  horasEstimadas: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class AsignarHerramientaUseCase {
  constructor(
    @Inject(HERRAMIENTA_ASIGNADA_REPOSITORY)
    private readonly repo: HerramientaAsignadaRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: AsignarHerramientaInput): Promise<HerramientaAsignada> {
    const herramienta = HerramientaAsignada.crear(input);
    const guardado = await this.repo.guardar(herramienta);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Asignación de herramienta',
      cambios: {
        activoFijoAsignado: input.activoFijoId,
        horasEstimadas: input.horasEstimadas,
      },
    });

    return guardado;
  }
}