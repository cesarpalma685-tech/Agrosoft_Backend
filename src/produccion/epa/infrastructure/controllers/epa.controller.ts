import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CrearEpaUseCase } from "../../application/use-cases/crear-epa.use-case";
import { ListarEpaUseCase } from "../../application/use-cases/listar-epa.use-case";
import { AsociarTiposCultivoEpaUseCase } from "../../application/use-cases/asociar-tipos-cultivo-epa.use-case";
import { CrearEpaDto } from "../../application/dto/crear-epa.dto";
import { AsociarTiposCultivoEpaDto } from "../../application/dto/asociar-tipos-cultivo-epa.dto";

@Controller("epas")
export class EpaController {
  constructor(
    private readonly crearEpaUseCase: CrearEpaUseCase,
    private readonly listarEpaUseCase: ListarEpaUseCase,
    private readonly asociarTiposCultivoEpaUseCase: AsociarTiposCultivoEpaUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearEpaDto) {
    return await this.crearEpaUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarEpaUseCase.execute();
  }

  @Post(":id/tipos-cultivo")
  async asociarTiposCultivo(
    @Param("id") id: string,
    @Body() dto: AsociarTiposCultivoEpaDto,
  ) {
    await this.asociarTiposCultivoEpaUseCase.execute(
      +id,
      dto.tipoCultivoWikiIds,
    );
    return { message: "Tipos de cultivo asociados correctamente" };
  }
}
