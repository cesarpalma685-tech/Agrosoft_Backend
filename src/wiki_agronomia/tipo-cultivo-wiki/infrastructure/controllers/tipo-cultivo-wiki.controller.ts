import { Body, Controller, Get, Post } from "@nestjs/common";
import { CrearTipoCultivoWikiUseCase } from "../../application/use-cases/crear-tipo-cultivo-wiki.use-case";
import { ListarTipoCultivoWikiUseCase } from "../../application/use-cases/listar-tipo-cultivo-wiki.use-case";
import { CrearTipoCultivoWikiDto } from "../../application/dto/crear-tipo-cultivo-wiki.dto";

@Controller("tipos-cultivos-wiki")
export class TipoCultivoWikiController {
  constructor(
    private readonly crearTipoCultivoWikiUseCase: CrearTipoCultivoWikiUseCase,
    private readonly listarTipoCultivoWikiUseCase: ListarTipoCultivoWikiUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearTipoCultivoWikiDto) {
    return await this.crearTipoCultivoWikiUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarTipoCultivoWikiUseCase.execute();
  }
}
