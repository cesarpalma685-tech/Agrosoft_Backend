import { Injectable } from "@nestjs/common";
import { ActividadRepositoryPort } from "../ports/actividad.repository.port";
import { Actividad } from "../../domain/entities/actividad.entity";

@Injectable()
export class ListarActividadUseCase {
  constructor(private readonly actividadRepository: ActividadRepositoryPort) {}

  async execute(): Promise<Actividad[]> {
    return await this.actividadRepository.findAll();
  }
}
