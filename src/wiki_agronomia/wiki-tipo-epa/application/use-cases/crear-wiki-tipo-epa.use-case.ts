import { Injectable } from "@nestjs/common";
import { WikiTipoEpaRepositoryPort } from "../ports/wiki-tipo-epa.repository.port";
import { CrearWikiTipoEpaDto } from "../dto/crear-wiki-tipo-epa.dto";
import { WikiTipoEpa } from "../../domain/entities/wiki-tipo-epa.entity";

@Injectable()
export class CrearWikiTipoEpaUseCase {
  constructor(
    private readonly wikiTipoEpaRepository: WikiTipoEpaRepositoryPort,
  ) {}

  async execute(dto: CrearWikiTipoEpaDto): Promise<WikiTipoEpa> {
    const nuevo = new WikiTipoEpa();
    Object.assign(nuevo, dto);
    return await this.wikiTipoEpaRepository.save(nuevo);
  }
}
