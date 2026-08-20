import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegistrarUsoInsumoUseCase } from '../../../application/use-cases/insumos-uso/registrar-uso-insumo.use-case';
import { ListarUsosInsumoPorActividadUseCase } from '../../../application/use-cases/insumos-uso/listar-usos-insumo-por-actividad.use-case';
import { RegistrarUsoInsumoDto } from '../dtos/registrar-uso-insumo.dto';

@Controller('actividades/:actividadId/insumos-uso')
export class InsumosUsoController {
  constructor(
    private readonly registrarUso: RegistrarUsoInsumoUseCase,
    private readonly listarUsos: ListarUsosInsumoPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarUsoInsumoDto,
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