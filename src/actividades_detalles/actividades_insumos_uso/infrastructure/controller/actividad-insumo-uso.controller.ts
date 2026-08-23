import { RegistrarInsumoUsoUseCase } from '../../application/use-cases/registrar-insumo-uso.use-case';
import { ListarInsumosUsoPorActividadUseCase } from '../../application/use-cases/listar-insumos-uso-por-actividad.use-case';
import { RegistrarActividadInsumoUsoDto } from '../../application/dto/actividad_insumo_uso.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/insumos-uso')
export class ActividadInsumoUsoController {
  constructor(
    private readonly registrarUseCase: RegistrarInsumoUsoUseCase,
    private readonly listarUseCase: ListarInsumosUsoPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarActividadInsumoUsoDto,
  ) {
    dto.actividadId = actividadId;
    return await this.registrarUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
