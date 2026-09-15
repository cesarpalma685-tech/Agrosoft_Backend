import { Injectable } from "@nestjs/common";
import { UsoHerramientaRepositoryPort } from "../ports/uso-herramienta.repository.port";
import { UsoHerramienta } from "../../domain/entities/uso-herramienta.entity";

@Injectable()
export class ListarUsosHerramientaUseCase {
  constructor(
    private readonly usoHerramientaRepository: UsoHerramientaRepositoryPort,
  ) {}

  async execute(): Promise<UsoHerramienta[]> {
    return await this.usoHerramientaRepository.findAll();
  }
}
