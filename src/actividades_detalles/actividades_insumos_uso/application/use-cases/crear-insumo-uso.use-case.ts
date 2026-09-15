import { Injectable } from "@nestjs/common";
import { ActividadInsumoUsoRepositoryPort } from "../ports/actividad-insumo-uso.repository.port";
import { ActividadInsumoUso } from "../../domain/entities/actividad-insumo-uso.entity";
import { CrearActividadInsumoUsoDto } from "../dto/actividad_insumo_uso.dto";

@Injectable()
export class CrearActividadInsumoUsoUseCase {
  constructor(
    private readonly actividadInsumoUsoRepository: ActividadInsumoUsoRepositoryPort,
  ) {}

  async execute(dto: CrearActividadInsumoUsoDto): Promise<ActividadInsumoUso> {
    const nuevoUso = new ActividadInsumoUso();
    Object.assign(nuevoUso, dto);
    nuevoUso.costoTotal = dto.cantidadUso * dto.costoUnitarioUso;
    return await this.actividadInsumoUsoRepository.save(nuevoUso);
  }
}
