import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCultivoHistorialUseCase } from '../../application/create-cultivo-historial.use-case';
import { ListCultivoHistorialUseCase } from '../../application/list-cultivo-historial.use-case';
import { CreateCultivoHistorialDto } from './dto/create-cultivo-historial.dto';

@Controller('cultivo-historial')
export class CultivoHistorialController {
  constructor(
    private readonly createCultivoHistorialUseCase: CreateCultivoHistorialUseCase,
    private readonly listCultivoHistorialUseCase: ListCultivoHistorialUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateCultivoHistorialDto) {
    return this.createCultivoHistorialUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listCultivoHistorialUseCase.execute();
  }
}