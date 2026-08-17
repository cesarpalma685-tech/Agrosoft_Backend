import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearCultivoUseCase } from '../../application/use-cases/crear-cultivo.use-case';
import { ListarCultivoUseCase } from '../../application/use-cases/listar-cultivo.use-case';
import { CrearCultivoDto } from '../../application/dto/crear-cultivo.dto';

@Controller('cultivos')
export class CultivoController {
  constructor(
    private readonly crearCultivoUseCase: CrearCultivoUseCase,
    private readonly listarCultivoUseCase: ListarCultivoUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearCultivoDto) {
    return await this.crearCultivoUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarCultivoUseCase.execute();
  }
}