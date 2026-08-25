import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CrearActividadResponsableUseCase } from '../../application/use-cases/crear-responsable.use-case';
import { ListarActividadResponsablesUseCase } from '../../application/use-cases/listar-responsables-por-actividad.use-case';
import { CrearActividadResponsableDto } from '../../application/dto/actividad_responsable.dto';
import { ActividadResponsable } from '../../domain/entities/actividad_responsable.entity';

@Controller('actividades/:actividadId/responsables')
export class ActividadResponsableController {
  constructor(
    private readonly crearUseCase: CrearActividadResponsableUseCase,
    private readonly listarUseCase: ListarActividadResponsablesUseCase,
  ) {}

  @Post()
  async save(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadResponsableDto,
  ): Promise<ActividadResponsable> {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos(): Promise<ActividadResponsable[]> {
    return await this.listarUseCase.execute();
  }
}
