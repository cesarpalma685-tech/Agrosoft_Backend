import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLoteProduccionUseCase } from '../../application/create-lote-produccion.use-case';
import { ListLoteProduccionUseCase } from '../../application/list-lote-produccion.use-case';
import { CreateLoteProduccionDto } from './dto/create-lote-produccion.dto';

@Controller('lotes-produccion')
export class LoteProduccionController {
  constructor(
    private readonly createLoteProduccionUseCase: CreateLoteProduccionUseCase,
    private readonly listLoteProduccionUseCase: ListLoteProduccionUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateLoteProduccionDto) {
    return this.createLoteProduccionUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listLoteProduccionUseCase.execute();
  }
}