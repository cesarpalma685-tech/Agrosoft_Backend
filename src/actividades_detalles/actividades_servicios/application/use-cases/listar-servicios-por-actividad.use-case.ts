import { Injectable } from "@nestjs/common";
import { ActividadServicioRepositoryPort } from "../ports/actividad-servicio.repository.port";
import { ActividadServicio } from "../../domain/entities/actividad-servicio.entity";

@Injectable()
export class ListarActividadServiciosUseCase {
  constructor(
    private readonly actividadServicioRepository: ActividadServicioRepositoryPort,
  ) {}

  async execute(actividadId?: number): Promise<ActividadServicio[]> {
    if (actividadId !== undefined) return await this.actividadServicioRepository.findByActividadIds([actividadId]);
    return await this.actividadServicioRepository.findAll();
  }
}
