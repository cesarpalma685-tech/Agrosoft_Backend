import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearActividadInsumoUsoUseCase } from '../../application/use-cases/crear-insumo-uso.use-case';
import { ListarActividadInsumoUsosUseCase } from '../../application/use-cases/listar-insumos-uso-por-actividad.use-case';
import { CrearActividadInsumoUsoDto } from '../../application/dto/actividad_insumo_uso.dto';

@Controller('actividades/:actividadId/insumos-uso')
export class ActividadInsumoUsoController {
  constructor(
    private readonly crearUseCase: CrearActividadInsumoUsoUseCase,
    private readonly listarUseCase: ListarActividadInsumoUsosUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadInsumoUsoDto,
  ): Promise<any> {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(): Promise<any> {
    return await this.listarUseCase.execute();
  }
}
