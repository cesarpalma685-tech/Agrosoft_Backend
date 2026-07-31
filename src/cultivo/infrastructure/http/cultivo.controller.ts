import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCultivoUseCase } from '../../application/create-cultivo.use-case';
import { ListCultivoUseCase } from '../../application/list-cultivo.use-case';
import { CreateCultivoDto } from './dto/create-cultivo.dto';

@Controller('cultivos')
export class CultivoController {
  constructor(
    private readonly createCultivoUseCase: CreateCultivoUseCase,
    private readonly listCultivoUseCase: ListCultivoUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateCultivoDto) {
    return this.createCultivoUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listCultivoUseCase.execute();
  }
}