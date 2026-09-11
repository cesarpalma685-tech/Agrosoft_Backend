import { Body, Controller, Get, Post } from "@nestjs/common";
import { CrearWikiTipoEpaUseCase } from "../../application/use-cases/crear-wiki-tipo-epa.use-case";
import { ListarWikiTipoEpaUseCase } from "../../application/use-cases/listar-wiki-tipo-epa.use-case";
import { CrearWikiTipoEpaDto } from "../../application/dto/crear-wiki-tipo-epa.dto";

@Controller("wiki-tipo-epa")
export class WikiTipoEpaController {
  constructor(
    private readonly crearWikiTipoEpaUseCase: CrearWikiTipoEpaUseCase,
    private readonly listarWikiTipoEpaUseCase: ListarWikiTipoEpaUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearWikiTipoEpaDto) {
    return await this.crearWikiTipoEpaUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarWikiTipoEpaUseCase.execute();
  }
}
