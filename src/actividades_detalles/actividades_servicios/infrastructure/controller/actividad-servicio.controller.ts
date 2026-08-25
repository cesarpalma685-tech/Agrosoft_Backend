import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearActividadServicioUseCase } from '../../application/use-cases/crear-servicio.use-case';
import { ListarActividadServiciosUseCase } from '../../application/use-cases/listar-servicios-por-actividad.use-case';
import { CrearActividadServicioDto } from '../../application/dto/actividad_servicio.dto';
import { ActividadServicio } from '../../domain/entities/actividad-servicio.entity';

@Controller('actividades/:actividadId/servicios')
export class ActividadServicioController {
  constructor(
    private readonly crearUseCase: CrearActividadServicioUseCase,
    private readonly listarUseCase: ListarActividadServiciosUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadServicioDto,
  ): Promise<ActividadServicio> {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(): Promise<ActividadServicio[]> {
    return await this.listarUseCase.execute();
  }
}
