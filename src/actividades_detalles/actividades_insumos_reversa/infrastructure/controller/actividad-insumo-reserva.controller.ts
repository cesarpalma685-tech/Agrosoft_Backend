import { ReservarInsumoUseCase } from '../../application/use-cases/reservar-insumo.use-case';
import { ListarInsumosReservaPorActividadUseCase } from '../../application/use-cases/listar-insumos-reserva-por-actividad.use-case';
import { ReservarActividadInsumoDto } from '../../application/dto/actividad_insumo_reserva.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('actividades/:actividadId/insumos-reserva')
export class ActividadInsumoReservaController {
  constructor(
    private readonly reservarUseCase: ReservarInsumoUseCase,
    private readonly listarUseCase: ListarInsumosReservaPorActividadUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: ReservarActividadInsumoDto,
  ) {
    dto.actividadId = actividadId;
    return await this.reservarUseCase.execute(dto);
  }

  @Get()
  async obtenerPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return await this.listarUseCase.execute(actividadId);
  }
}
