import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegistrarInsumoActividadUseCase } from '../../../application/use-cases/insumos/registrar-insumo-actividad.use-case';
import { ListarInsumosActividadPorActividadUseCase } from '../../../application/use-cases/insumos/listar-insumos-actividad-por-actividad.use-case';
import { RegistrarInsumoActividadDto } from '../dtos/registrar-insumo-actividad.dto';

@Controller('actividades/:actividadId/insumos')
export class InsumosController {
  constructor(
    private readonly registrarInsumo: RegistrarInsumoActividadUseCase,
    private readonly listarInsumos: ListarInsumosActividadPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarInsumoActividadDto,
  ) {
    return this.registrarInsumo.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarInsumos.execute(actividadId);
  }
}