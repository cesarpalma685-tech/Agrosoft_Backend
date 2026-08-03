import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateActividadUseCase } from '../../application/create-actividad.use-case';
import { ListActividadUseCase } from '../../application/list-actividad.use-case';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Controller('actividades')
export class ActividadController {
  constructor(
    private readonly createActividadUseCase: CreateActividadUseCase,
    private readonly listActividadUseCase: ListActividadUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateActividadDto) {
    return this.createActividadUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listActividadUseCase.execute();
  }
}