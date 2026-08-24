import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearActividadInsumoReservaUseCase } from '../../application/use-cases/crear-insumo.use-case';
import { ListarActividadInsumoReservasUseCase } from '../../application/use-cases/listar-insumos-reserva-por-actividad.use-case';
import { CrearActividadInsumoReservaDto } from '../../application/dto/actividad_insumo_reserva.dto';

@Controller('actividades/:actividadId/insumos-reserva')
export class ActividadInsumoReservaController {
  constructor(
    private readonly crearUseCase: CrearActividadInsumoReservaUseCase,
    private readonly listarUseCase: ListarActividadInsumoReservasUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadInsumoReservaDto,
  ): Promise<any> {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(): Promise<any> {
    return await this.listarUseCase.execute();
  }
}
