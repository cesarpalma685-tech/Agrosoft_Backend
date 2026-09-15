import { Injectable } from "@nestjs/common";
import { ActividadInsumoUsoRepositoryPort } from "../ports/actividad-insumo-uso.repository.port";
import { ActividadInsumoUso } from "../../domain/entities/actividad-insumo-uso.entity";

@Injectable()
export class ListarActividadInsumoUsosUseCase {
  constructor(
    private readonly actividadInsumoUsoRepository: ActividadInsumoUsoRepositoryPort,
  ) {}

  async execute(): Promise<ActividadInsumoUso[]> {
    return await this.actividadInsumoUsoRepository.findAll();
  }
}
