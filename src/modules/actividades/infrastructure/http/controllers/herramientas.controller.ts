import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AsignarHerramientaUseCase } from '../../../application/use-cases/herramientas/asignar-herramienta.use-case';
import { ListarHerramientasPorActividadUseCase } from '../../../application/use-cases/herramientas/listar-herramientas-por-actividad.use-case';
import { AsignarHerramientaDto } from '../dtos/asignar-herramienta.dto';

@Controller('actividades/:actividadId/herramientas')
export class HerramientasController {
  constructor(
    private readonly asignarHerramienta: AsignarHerramientaUseCase,
    private readonly listarHerramientas: ListarHerramientasPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: AsignarHerramientaDto,
  ) {
    return this.asignarHerramienta.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarHerramientas.execute(actividadId);
  }
}