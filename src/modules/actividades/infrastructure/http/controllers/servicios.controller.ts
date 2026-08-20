import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AsignarServicioUseCase } from '../../../application/use-cases/servicios/asignar-servicio.use-case';
import { ListarServiciosPorActividadUseCase } from '../../../application/use-cases/servicios/listar-servicios-por-actividad.use-case';
import { AsignarServicioDto } from '../dtos/asignar-servicio.dto';

@Controller('actividades/:actividadId/servicios')
export class ServiciosController {
  constructor(
    private readonly asignarServicio: AsignarServicioUseCase,
    private readonly listarServicios: ListarServiciosPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: AsignarServicioDto,
  ) {
    return this.asignarServicio.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarServicios.execute(actividadId);
  }
}