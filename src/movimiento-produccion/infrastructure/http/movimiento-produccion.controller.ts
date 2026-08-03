import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMovimientoProduccionUseCase } from '../../application/create-movimiento-produccion.use-case';
import { ListMovimientoProduccionUseCase } from '../../application/list-movimiento-produccion.use-case';
import { CreateMovimientoProduccionDto } from './dto/create-movimiento-produccion.dto';

@Controller('movimientos-produccion')
export class MovimientoProduccionController {
  constructor(
    private readonly createMovimientoProduccionUseCase: CreateMovimientoProduccionUseCase,
    private readonly listMovimientoProduccionUseCase: ListMovimientoProduccionUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateMovimientoProduccionDto) {
    return this.createMovimientoProduccionUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listMovimientoProduccionUseCase.execute();
  }
}