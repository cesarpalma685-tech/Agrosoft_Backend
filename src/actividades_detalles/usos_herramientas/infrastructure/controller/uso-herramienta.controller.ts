import { RegistrarUsoHerramientaUseCase } from '../../application/use-cases/registrar-uso-herramienta.use-case';
import { ListarUsosHerramientasPorActividadUseCase } from '../../application/use-cases/listar-usos-herramientas-por-actividad.use-case';
import { RegistrarUsoHerramientaDto } from '../../application/dto/uso_herramienta.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/usos-herramientas')
export class UsoHerramientaController {
  constructor(
    private readonly registrarUseCase: RegistrarUsoHerramientaUseCase,
    private readonly listarUseCase: ListarUsosHerramientasPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarUsoHerramientaDto,
  ) {
    dto.actividadId = actividadId;
    return await this.registrarUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
