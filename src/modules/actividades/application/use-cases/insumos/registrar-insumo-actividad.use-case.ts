import { Inject, Injectable } from '@nestjs/common';
import { InsumoActividad } from '../../../domain/entities/insumo-actividad.entity';
import type { InsumoActividadRepositoryPort } from '../../../domain/ports/insumo-actividad.repository.port';
import { INSUMO_ACTIVIDAD_REPOSITORY } from '../../../domain/ports/insumo-actividad.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface RegistrarInsumoActividadInput {
  actividadId: number;
  insumoId: number;
  cantidadUsada: number;
  unidad: string;
  costoUnitario: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class RegistrarInsumoActividadUseCase {
  constructor(
    @Inject(INSUMO_ACTIVIDAD_REPOSITORY)
    private readonly repo: InsumoActividadRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: RegistrarInsumoActividadInput): Promise<InsumoActividad> {
    const insumo = InsumoActividad.crear(input);
    const guardado = await this.repo.guardar(insumo);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Registro de insumo en actividad',
      cambios: {
        insumoRegistrado: input.insumoId,
        cantidadUsada: input.cantidadUsada,
        unidad: input.unidad,
        costoTotal: guardado.costoTotal,
      },
    });

    return guardado;
  }
}