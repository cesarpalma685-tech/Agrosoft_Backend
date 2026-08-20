import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReservarInsumoUseCase } from '../../../application/use-cases/insumos-reserva/reservar-insumo.use-case';
import { ListarReservasPorActividadUseCase } from '../../../application/use-cases/insumos-reserva/listar-reservas-por-actividad.use-case';
import { ReservarInsumoDto } from '../dtos/reservar-insumo.dto';

@Controller('actividades/:actividadId/insumos-reserva')
export class InsumosReservaController {
  constructor(
    private readonly reservarInsumo: ReservarInsumoUseCase,
    private readonly listarReservas: ListarReservasPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: ReservarInsumoDto,
  ) {
    return this.reservarInsumo.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarReservas.execute(actividadId);
  }
}