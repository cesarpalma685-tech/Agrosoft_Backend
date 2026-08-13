import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegistrarUsoHerramientaUseCase } from '../../../application/use-cases/usos-herramientas/registrar-uso-herramienta.use-case';
import { ListarUsosHerramientaPorActividadUseCase } from '../../../application/use-cases/usos-herramientas/listar-usos-herramienta-por-actividad.use-case';
import { RegistrarUsoHerramientaDto } from '../dtos/registrar-uso-herramienta.dto';

@Controller('actividades/:actividadId/usos-herramientas')
export class UsosHerramientasController {
  constructor(
    private readonly registrarUso: RegistrarUsoHerramientaUseCase,
    private readonly listarUsos: ListarUsosHerramientaPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarUsoHerramientaDto,
  ) {
    return this.registrarUso.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarUsos.execute(actividadId);
  }
}