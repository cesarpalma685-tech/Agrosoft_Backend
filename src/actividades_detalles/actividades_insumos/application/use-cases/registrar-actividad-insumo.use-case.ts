import { Injectable } from "@nestjs/common";
import { ActividadInsumoRepositoryPort } from "../ports/actividad-insumo.repository.port";
import { ActividadInsumo } from "../../domain/entities/actividad-insumo.entity";
import { CrearActividadInsumoDto } from "../dto/actividad_insumo.dto";

@Injectable()
export class CrearActividadInsumoUseCase {
  constructor(
    private readonly actividadInsumoRepository: ActividadInsumoRepositoryPort,
  ) {}

  async execute(dto: CrearActividadInsumoDto): Promise<ActividadInsumo> {
    const nuevoInsumo = new ActividadInsumo();
    Object.assign(nuevoInsumo, dto);
    nuevoInsumo.costoTotal = dto.cantidadUsada * dto.costoUnitario;
    return await this.actividadInsumoRepository.save(nuevoInsumo);
  }
}
