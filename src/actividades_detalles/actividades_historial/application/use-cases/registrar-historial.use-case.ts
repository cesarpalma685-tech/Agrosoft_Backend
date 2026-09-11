import { Injectable } from "@nestjs/common";
import { ActividadHistorialRepositoryPort } from "../ports/actividad-historial.repository.port";
import { ActividadHistorial } from "../../domain/entities/actividad-historial.entity";
import { CrearActividadHistorialDto } from "../dto/actividad_historial.dto";

@Injectable()
export class CrearActividadHistorialUseCase {
  constructor(
    private readonly actividadHistorialRepository: ActividadHistorialRepositoryPort,
  ) {}

  async execute(dto: CrearActividadHistorialDto): Promise<ActividadHistorial> {
    const nuevoHistorial = new ActividadHistorial();
    Object.assign(nuevoHistorial, dto);
    return await this.actividadHistorialRepository.save(nuevoHistorial);
  }
}
