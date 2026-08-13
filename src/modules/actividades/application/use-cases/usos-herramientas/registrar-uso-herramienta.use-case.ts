import { Inject, Injectable } from '@nestjs/common';
import { UsoHerramienta } from '../../../domain/entities/uso-herramienta.entity';
import type { UsoHerramientaRepositoryPort } from '../../../domain/ports/uso-herramienta.repository.port';
import { USO_HERRAMIENTA_REPOSITORY } from '../../../domain/ports/uso-herramienta.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface RegistrarUsoHerramientaInput {
  actividadId: number;
  insumoId: number;
  horasUsadas: number;
  valorEnLibrosAntes: number;
  tasaDepreciacionPorHora: number;
  usuarioQueRegistraId: number;
}

@Injectable()
export class RegistrarUsoHerramientaUseCase {
  constructor(
    @Inject(USO_HERRAMIENTA_REPOSITORY)
    private readonly repo: UsoHerramientaRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: RegistrarUsoHerramientaInput): Promise<UsoHerramienta> {
    const uso = UsoHerramienta.crear(input);
    const guardado = await this.repo.guardar(uso);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Registro de uso de herramienta',
      cambios: {
        insumoUsado: input.insumoId,
        horasUsadas: input.horasUsadas,
        depreciacionGenerada: guardado.depreciacionGenerada,
        valorEnLibrosDespues: guardado.valorEnLibrosDespues,
      },
    });

    return guardado;
  }
}