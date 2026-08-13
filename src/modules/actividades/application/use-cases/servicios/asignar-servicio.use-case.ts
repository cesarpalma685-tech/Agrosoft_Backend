import { Inject, Injectable } from '@nestjs/common';
import { Servicio } from '../../../domain/entities/servicio.entity';
import type { ServicioRepositoryPort } from '../../../domain/ports/servicio.repository.port';
import { SERVICIO_REPOSITORY } from '../../../domain/ports/servicio.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface AsignarServicioInput {
  actividadId: number;
  maquinariaId: number;
  nombreServicio: string;
  horas: number;
  precioHora: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class AsignarServicioUseCase {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly repo: ServicioRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: AsignarServicioInput): Promise<Servicio> {
    const servicio = Servicio.crear(input);
    const guardado = await this.repo.guardar(servicio);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Asignación de servicio',
      cambios: {
        maquinariaAsignada: input.maquinariaId,
        nombreServicio: input.nombreServicio,
        horas: input.horas,
      },
    });

    return guardado;
  }
}