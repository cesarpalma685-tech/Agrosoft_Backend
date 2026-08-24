import { AsignarResponsableUseCase } from '../../application/use-cases/asignar-responsable.use-case';
import { ListarResponsablesPorActividadUseCase } from '../../application/use-cases/listar-responsables-por-actividad.use-case';
import { AsignarActividadResponsableDto } from '../../application/dto/actividad_responsable.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/responsables')
export class ActividadResponsableController {
  constructor(
    private readonly asignarUseCase: AsignarResponsableUseCase,
    private readonly listarUseCase: ListarResponsablesPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: AsignarActividadResponsableDto,
  ) {
    dto.actividadId = actividadId;
    return await this.asignarUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
