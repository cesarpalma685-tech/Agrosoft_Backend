import { Injectable } from "@nestjs/common";
import { WikiTipoEpaRepositoryPort } from "../ports/wiki-tipo-epa.repository.port";
import { WikiTipoEpa } from "../../domain/entities/wiki-tipo-epa.entity";

@Injectable()
export class ListarWikiTipoEpaUseCase {
  constructor(
    private readonly wikiTipoEpaRepository: WikiTipoEpaRepositoryPort,
  ) {}

  async execute(): Promise<WikiTipoEpa[]> {
    return await this.wikiTipoEpaRepository.findAll();
  }
}
