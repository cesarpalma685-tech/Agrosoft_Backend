import { Injectable } from "@nestjs/common";
import { ActividadEvidenciaRepositoryPort } from "../ports/actividad-evidencia.repository.port";
import { ActividadEvidencia } from "../../domain/entities/actividad_evidencia.entity";
@Injectable()
export class ListarActividadEvidenciasUseCase {
  constructor(
    private readonly actividadEvidenciaRepository: ActividadEvidenciaRepositoryPort,
  ) {}

  async execute(actividadId?: number): Promise<ActividadEvidencia[]> {
    if (actividadId !== undefined) return await this.actividadEvidenciaRepository.findByActividadId(actividadId);
    return await this.actividadEvidenciaRepository.findAll();
  }
}
