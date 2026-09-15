import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CrearActividadEvidenciaUseCase } from "../../application/use-cases/registrar-evidencia.use-case";
import { ListarActividadEvidenciasUseCase } from "../../application/use-cases/listar-evidencias-por-actividad.use-case";
import { CrearActividadEvidenciaDto } from "../../application/dto/actividad_evidencia.dto";

@Controller("actividades/:actividadId/evidencias")
export class ActividadEvidenciaController {
  constructor(
    private readonly crearUseCase: CrearActividadEvidenciaUseCase,
    private readonly listarUseCase: ListarActividadEvidenciasUseCase,
  ) {}

  @Post()
  async save(
    @Param("actividadId", ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadEvidenciaDto,
  ) {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.listarUseCase.execute();
  }
}
