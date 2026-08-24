import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { RegistrarMovimientoInsumoUseCase } from '../../application/use-cases/crear-movimiento-insumo.use-case';
import { MovimientoInsumoRepositoryPort } from '../../application/ports/crear-movimiento-insumo.repository.port';
import { CrearMovimientoIsumoDto } from '../../application/dto/crear-movimiento-insumo.dto';
@Controller('movimientos-insumos')
export class MovimientoInsumoController {
  constructor(
    private readonly registrarMovimientoUseCase: RegistrarMovimientoInsumoUseCase,
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  @Post()
  async registrar(@Body() dto: CrearMovimientoIsumoDto) {
    return await this.registrarMovimientoUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.movimientoRepository.findAll();
  }

  @Get('insumo/:insumoId')
  async obtenerPorInsumo(@Param('insumoId', ParseIntPipe) insumoId: number) {
    return await this.movimientoRepository.findByInsumoId(insumoId);
  }
}