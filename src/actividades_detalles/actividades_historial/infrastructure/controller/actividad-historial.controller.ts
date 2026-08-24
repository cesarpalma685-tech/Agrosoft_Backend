import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearActividadHistorialUseCase } from '../../application/use-cases/registrar-historial.use-case';
import { ListarActividadesHistorialUseCase } from '../../application/use-cases/listar-historial-por-actividad.use-case';
import { CrearActividadHistorialDto } from '../../application/dto/actividad_historial.dto';

@Controller('actividades/:actividadId/historial')
export class ActividadHistorialController {
  constructor(
    private readonly crearUseCase: CrearActividadHistorialUseCase,
    private readonly listarUseCase: ListarActividadesHistorialUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadHistorialDto,
  ) {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.listarUseCase.execute();
  }
}
