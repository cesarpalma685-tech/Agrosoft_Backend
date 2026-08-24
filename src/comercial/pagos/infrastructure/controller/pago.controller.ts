import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe 
} from '@nestjs/common';
import { CrearPagoUseCase } from '../../application/use-cases/crear-pago.use-case';
import { ListarPagosUseCase } from '../../application/use-cases/listar-pagos.use-case';
import { ActualizarPagoUseCase } from '../../application/use-cases/actualizar-pago.use-case';
import { EliminarPagoUseCase } from '../../application/use-cases/eliminar-pago.use-case';
import { CrearPagoDto } from '../../application/dto/crear-pago.dto';
import { ObtenerPagoPorIdUseCase } from '../../application/use-cases/obtener-pago.use-case';

@Controller('pagos')
export class PagoController {
  constructor(
    private readonly crearUseCase: CrearPagoUseCase,
    private readonly listarUseCase: ListarPagosUseCase,
    private readonly obtenerPorIdUseCase: ObtenerPagoPorIdUseCase,
    private readonly actualizarUseCase: ActualizarPagoUseCase,
    private readonly eliminarUseCase: EliminarPagoUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearPagoDto) {
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodas() {
    return await this.listarUseCase.execute();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.obtenerPorIdUseCase.execute(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CrearPagoDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}