import { Inject, Injectable } from '@nestjs/common';
import { Responsable } from '../../../domain/entities/responsable.entity';
import type { ResponsableRepositoryPort } from '../../../domain/ports/responsable.repository.port';
import { RESPONSABLE_REPOSITORY } from '../../../domain/ports/responsable.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface AsignarResponsableInput {
  actividadId: number;
  usuarioId: number;
  horas: number;
  precioHora: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class AsignarResponsableUseCase {
  constructor(
    @Inject(RESPONSABLE_REPOSITORY)
    private readonly repo: ResponsableRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: AsignarResponsableInput): Promise<Responsable> {
    const responsable = Responsable.crear(input);
    const guardado = await this.repo.guardar(responsable);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Asignación de responsable',
      cambios: { usuarioAsignado: input.usuarioId, horas: input.horas },
    });

    return guardado;
  }
}