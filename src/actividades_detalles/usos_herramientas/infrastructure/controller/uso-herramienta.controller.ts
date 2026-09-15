import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CrearUsoHerramientaUseCase } from "../../application/use-cases/crear-usos-herramientas-por-actividad.use-case";
import { ListarUsosHerramientaUseCase } from "../../application/use-cases/listar-uso-herramienta.use-case";
import { CrearUsoHerramientaDto } from "../../application/dto/uso_herramienta.dto";
import { UsoHerramienta } from "../../domain/entities/uso-herramienta.entity";

@Controller("actividades/:actividadId/usos-herramientas")
export class UsoHerramientaController {
  constructor(
    private readonly crearUseCase: CrearUsoHerramientaUseCase,
    private readonly listarUseCase: ListarUsosHerramientaUseCase,
  ) {}

  @Post()
  async save(
    @Param("actividadId", ParseIntPipe) actividadId: number,
    @Body() dto: CrearUsoHerramientaDto,
  ): Promise<UsoHerramienta> {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(): Promise<UsoHerramienta[]> {
    return await this.listarUseCase.execute();
  }
}
