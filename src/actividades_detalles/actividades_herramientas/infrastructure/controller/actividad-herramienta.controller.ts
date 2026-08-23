import { AsignarHerramientaUseCase } from '../../application/use-cases/asignar-herramienta.use-case';
import { ListarHerramientasPorActividadUseCase } from '../../application/use-cases/listar-herramientas-por-actividad.use-case';
import { AsignarActividadHerramientaDto } from '../../application/dto/actividad_herramienta.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/herramientas')
export class ActividadHerramientaController {
  constructor(
    private readonly asignarUseCase: AsignarHerramientaUseCase,
    private readonly listarUseCase: ListarHerramientasPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: AsignarActividadHerramientaDto,
  ) {
    dto.actividadId = actividadId;
    return await this.asignarUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
