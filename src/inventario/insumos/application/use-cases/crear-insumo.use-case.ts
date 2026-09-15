import { Injectable } from "@nestjs/common";
import { InsumoRepositoryPort } from "../ports/insumo.repository.port";
import { CrearInsumoDto } from "../dto/crear-insumo.dto";
import { Insumo } from "../../domain/entities/crear-insumo.dto";
@Injectable()
export class CrearInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepositoryPort) {}
  async execute(dto: CrearInsumoDto): Promise<Insumo> {
    const nuevoinsumo = new Insumo();
    Object.assign(nuevoinsumo, dto);
    nuevoinsumo.fechaRegistro = new Date();

    return await this.insumoRepository.save(nuevoinsumo);
  }
}
