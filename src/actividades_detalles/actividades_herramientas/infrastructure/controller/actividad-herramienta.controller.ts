import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CrearActividadHerramientaUseCase } from "../../application/use-cases/registrar-herramienta.use-case";
import { ListarActividadHerramientasUseCase } from "../../application/use-cases/listar-herramientas-por-actividad.use-case";
import { AsignarActividadHerramientaDto } from "../../application/dto/actividad_herramienta.dto";

@Controller("actividades/:actividadId/herramientas")
export class ActividadHerramientaController {
  constructor(
    private readonly crearUseCase: CrearActividadHerramientaUseCase,
    private readonly listarUseCase: ListarActividadHerramientasUseCase,
  ) {}

  @Post()
  async save(
    @Param("actividadId", ParseIntPipe) actividadId: number,
    @Body() dto: AsignarActividadHerramientaDto,
  ): Promise<any> {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(): Promise<any[]> {
    return await this.listarUseCase.execute();
  }
}
