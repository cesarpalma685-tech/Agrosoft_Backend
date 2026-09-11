import { Injectable } from "@nestjs/common";
import { EpaRepositoryPort } from "../ports/epa.repository.port";
import { Epa } from "../../domain/entities/epa.entity";

@Injectable()
export class ListarEpaUseCase {
  constructor(private readonly epaRepository: EpaRepositoryPort) {}

  async execute(): Promise<Epa[]> {
    return await this.epaRepository.findAll();
  }
}
