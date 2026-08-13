import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AsignarResponsableUseCase } from '../../../application/use-cases/responsables/asignar-responsable.use-case';
import { ListarResponsablesPorActividadUseCase } from '../../../application/use-cases/responsables/listar-responsables-por-actividad.use-case';
import { AsignarResponsableDto } from '../dtos/asignar-responsable.dto';

@Controller('actividades/:actividadId/responsables')
export class ResponsablesController {
  constructor(
    private readonly asignarResponsable: AsignarResponsableUseCase,
    private readonly listarResponsables: ListarResponsablesPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: AsignarResponsableDto,
  ) {
    return this.asignarResponsable.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarResponsables.execute(actividadId);
  }
}