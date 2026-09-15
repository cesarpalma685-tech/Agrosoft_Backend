import { Injectable } from "@nestjs/common";
import { ActividadEvidenciaRepositoryPort } from "../ports/actividad-evidencia.repository.port";
import { ActividadEvidencia } from "../../domain/entities/actividad_evidencia.entity";
@Injectable()
export class ListarActividadEvidenciasUseCase {
  constructor(
    private readonly actividadEvidenciaRepository: ActividadEvidenciaRepositoryPort,
  ) {}

  async execute(): Promise<ActividadEvidencia[]> {
    return await this.actividadEvidenciaRepository.findAll();
  }
}
