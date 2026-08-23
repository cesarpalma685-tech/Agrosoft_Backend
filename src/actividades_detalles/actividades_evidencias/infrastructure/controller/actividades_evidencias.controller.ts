import { CrearActividadEvidenciaUseCase } from '../../application/use-cases/crear-evidencia.use-case';
import { ListarEvidenciasPorActividadUseCase } from '../../application/use-cases/listar-evidencias-por-actividad.use-case';
import { CrearActividadEvidenciaDto } from '../../application/dto/actividad_evidencia.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/evidencias')
export class ActividadEvidenciaController {
  constructor(
    private readonly crearUseCase: CrearActividadEvidenciaUseCase,
    private readonly listarUseCase: ListarEvidenciasPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadEvidenciaDto,
  ) {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
