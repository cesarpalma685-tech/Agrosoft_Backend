import { ContratarServicioUseCase } from '../../application/use-cases/contratar-servicio.use-case';
import { ListarServiciosPorActividadUseCase } from '../../application/use-cases/listar-servicios-por-actividad.use-case';
import { ContratarActividadServicioDto } from '../../application/dto/actividad_servicio.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/servicios')
export class ActividadServicioController {
  constructor(
    private readonly contratarUseCase: ContratarServicioUseCase,
    private readonly listarUseCase: ListarServiciosPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: ContratarActividadServicioDto,
  ) {
    dto.actividadId = actividadId;
    return await this.contratarUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
