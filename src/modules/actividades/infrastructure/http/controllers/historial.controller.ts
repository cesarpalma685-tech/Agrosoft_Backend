import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegistrarHistorialUseCase } from '../../../application/use-cases/historial/registrar-historial.use-case';
import { ListarHistorialPorActividadUseCase } from '../../../application/use-cases/historial/listar-historial-por-actividad.use-case';
import { RegistrarHistorialDto } from '../dtos/registrar-historial.dto';

@Controller('actividades/:actividadId/historial')
export class HistorialController {
  constructor(
    private readonly registrarHistorial: RegistrarHistorialUseCase,
    private readonly listarHistorial: ListarHistorialPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarHistorialDto,
  ) {
    return this.registrarHistorial.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarHistorial.execute(actividadId);
  }
}