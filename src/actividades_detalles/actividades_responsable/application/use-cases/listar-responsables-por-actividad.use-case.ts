import { Injectable } from "@nestjs/common";
import { ActividadResponsableRepositoryPort } from "../ports/actividad-responsable.repository.port";
import { ActividadResponsable } from "../../domain/entities/actividad_responsable.entity";

@Injectable()
export class ListarActividadResponsablesUseCase {
  constructor(
    private readonly actividadResponsableRepository: ActividadResponsableRepositoryPort,
  ) {}

  async execute(actividadId?: number): Promise<ActividadResponsable[]> {
    if (actividadId !== undefined) {
      return await this.actividadResponsableRepository.findByActividadIds([actividadId]);
    }
    return await this.actividadResponsableRepository.findAll();
  }
}
