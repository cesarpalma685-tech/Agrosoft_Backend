import { Injectable } from '@nestjs/common';
import { ActividadEvidenciaRepositoryPort } from '../ports/actividad-evidencia.repository.port';

import { CrearActividadEvidenciaDto } from '../dto/actividad_evidencia.dto';
import { ActividadEvidencia } from '../../domain/entities/actividad_evidencia.entity';

@Injectable()
export class CrearActividadEvidenciaUseCase {
  constructor(
    private readonly actividadEvidenciaRepository: ActividadEvidenciaRepositoryPort,
  ) {}

  async execute(dto: CrearActividadEvidenciaDto): Promise<ActividadEvidencia> {
    const nuevaEvidencia = new ActividadEvidencia();
    Object.assign(nuevaEvidencia, dto);
    return await this.actividadEvidenciaRepository.save(nuevaEvidencia);
  }
}
