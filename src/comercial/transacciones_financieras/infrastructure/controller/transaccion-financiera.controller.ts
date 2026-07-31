import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  ParseIntPipe 
} from '@nestjs/common';
import { CrearTransaccionFinancieraUseCase } from '../../application/use-cases/crear-transaccion-financiera.use-case';
import { ListarTransaccionesFinancierasUseCase } from '../../application/use-cases/listar-transacciones-financieras.use-case';
import { ActualizarTransaccionFinancieraUseCase } from '../../application/use-cases/actualizar-transaccion-financiera.use-case';
import { EliminarTransaccionFinancieraUseCase } from '../../application/use-cases/eliminar-transaccion-financiera.use-case';
import { CrearTransaccionFinancieraDto } from '../../application/dto/crear-transaccion-financiera.dto';
import { ObtenerTransaccionFinancieraPorIdUseCase } from '../../application/use-cases/obtener-transaccion-financiera.use-case';

@Controller('transacciones-financieras')
export class TransaccionFinancieraController {
  constructor(
    private readonly crearUseCase: CrearTransaccionFinancieraUseCase,
    private readonly listarUseCase: ListarTransaccionesFinancierasUseCase,
    private readonly obtenerPorIdUseCase: ObtenerTransaccionFinancieraPorIdUseCase,
    private readonly actualizarUseCase: ActualizarTransaccionFinancieraUseCase,
    private readonly eliminarUseCase: EliminarTransaccionFinancieraUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearTransaccionFinancieraDto) {
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
    @Body() dto: Partial<CrearTransaccionFinancieraDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}