import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { CrearActividadEvidenciaUseCase } from "../../application/use-cases/registrar-evidencia.use-case";
import { ListarActividadEvidenciasUseCase } from "../../application/use-cases/listar-evidencias-por-actividad.use-case";
import { CrearActividadEvidenciaDto } from "../../application/dto/actividad_evidencia.dto";

@Controller("actividades/:actividadId/evidencias")
export class ActividadEvidenciaController {
  constructor(
    private readonly crearUseCase: CrearActividadEvidenciaUseCase,
    private readonly listarUseCase: ListarActividadEvidenciasUseCase,
  ) {}

  // PROTEGIDO: solo usuarios con sesión adjuntan evidencias
  @UseGuards(JwtAuthGuard)
  @Post()
  async save(
    @Param("actividadId", ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadEvidenciaDto,
  ) {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(@Param("actividadId", ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
