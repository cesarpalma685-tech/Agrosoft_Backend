import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearCultivoHistorialUseCase } from '../../application/use-cases/crear-cultivo-historial.use-case';
import { ListarCultivoHistorialUseCase } from '../../application/use-cases/listar-cultivo-historial.use-case';
import { CrearCultivoHistorialDto } from '../../application/dto/crear-cultivo-historial.dto';

@Controller('cultivo-historial')
export class CultivoHistorialController {
  constructor(
    private readonly crearCultivoHistorialUseCase: CrearCultivoHistorialUseCase,
    private readonly listarCultivoHistorialUseCase: ListarCultivoHistorialUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearCultivoHistorialDto) {
    return await this.crearCultivoHistorialUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarCultivoHistorialUseCase.execute();
  }
}