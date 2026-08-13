import { Inject, Injectable } from '@nestjs/common';
import { Evidencia } from '../../../domain/entities/evidencia.entity';
import type { EvidenciaRepositoryPort } from '../../../domain/ports/evidencia.repository.port';
import { EVIDENCIA_REPOSITORY } from '../../../domain/ports/evidencia.repository.port';
import type { HistorialLoggerPort } from '../../../domain/ports/historial-logger.port';
import { HISTORIAL_LOGGER } from '../../../domain/ports/historial-logger.port';

interface RegistrarEvidenciaInput {
  actividadId: number;
  descripcion: string;
  imagenes?: string[];
  usuarioQueRegistraId: number;
}

@Injectable()
export class RegistrarEvidenciaUseCase {
  constructor(
    @Inject(EVIDENCIA_REPOSITORY)
    private readonly repo: EvidenciaRepositoryPort,
    @Inject(HISTORIAL_LOGGER)
    private readonly historial: HistorialLoggerPort,
  ) {}

  async execute(input: RegistrarEvidenciaInput): Promise<Evidencia> {
    const evidencia = Evidencia.crear(input);
    const guardado = await this.repo.guardar(evidencia);

    await this.historial.registrar({
      actividadId: input.actividadId,
      usuarioId: input.usuarioQueRegistraId,
      motivo: 'Registro de evidencia',
      cambios: {
        descripcion: input.descripcion,
        cantidadImagenes: input.imagenes?.length ?? 0,
      },
    });

    return guardado;
  }
}