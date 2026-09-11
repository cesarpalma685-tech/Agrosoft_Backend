import { Injectable } from "@nestjs/common";
import { EpaRepositoryPort } from "../ports/epa.repository.port";
import { CrearEpaDto } from "../dto/crear-epa.dto";
import { Epa } from "../../domain/entities/epa.entity";

@Injectable()
export class CrearEpaUseCase {
  constructor(private readonly epaRepository: EpaRepositoryPort) {}

  async execute(dto: CrearEpaDto): Promise<Epa> {
    const nueva = new Epa();
    Object.assign(nueva, dto);
    return await this.epaRepository.save(nueva);
  }
}
