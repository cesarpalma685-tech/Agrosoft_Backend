import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearLoteProduccionUseCase } from '../../application/use-cases/crear-lote-produccion.use-case';
import { ListarLoteProduccionUseCase } from '../../application/use-cases/listar-lote-produccion.use-case';
import { CrearLoteProduccionDto } from '../../application/dto/crear-lote-produccion.dto';

@Controller('lotes-produccion')
export class LoteProduccionController {
  constructor(
    private readonly crearLoteProduccionUseCase: CrearLoteProduccionUseCase,
    private readonly listarLoteProduccionUseCase: ListarLoteProduccionUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearLoteProduccionDto) {
    return await this.crearLoteProduccionUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarLoteProduccionUseCase.execute();
  }
}