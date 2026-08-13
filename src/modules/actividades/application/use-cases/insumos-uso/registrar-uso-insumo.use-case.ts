import { Inject, Injectable } from '@nestjs/common';
import { UsoInsumo } from '../../../domain/entities/uso-insumo.entity';
import type { UsoInsumoRepositoryPort } from '../../../domain/ports/uso-insumo.repository.port';
import { USO_INSUMO_REPOSITORY } from '../../../domain/ports/uso-insumo.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface RegistrarUsoInsumoInput {
  actividadId: number;
  insumoId: number;
  cantidadUso: number;
  costoUnitarioUso: number;
  movimientoInsumoId: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class RegistrarUsoInsumoUseCase {
  constructor(
    @Inject(USO_INSUMO_REPOSITORY)
    private readonly repo: UsoInsumoRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: RegistrarUsoInsumoInput): Promise<UsoInsumo> {
    const uso = UsoInsumo.crear(input);
    const guardado = await this.repo.guardar(uso);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Registro de uso de insumo',
      cambios: {
        insumoUsado: input.insumoId,
        cantidadUso: input.cantidadUso,
        costoTotal: guardado.costoTotal,
        movimientoInsumoId: input.movimientoInsumoId,
      },
    });

    return guardado;
  }
}