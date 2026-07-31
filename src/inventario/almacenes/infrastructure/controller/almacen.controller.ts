import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe 
} from '@nestjs/common';
import { CrearAlmacenUseCase } from '../../aplication/use-cases/crear-almacen.use-case';
import { ObtenerAlmacenesUseCase } from '../../aplication/use-cases/listar-almacenes.use-case';
import { ObtenerAlmacenPorIdUseCase } from '../../aplication/use-cases/obtener-almacen.use-case';
import { ActualizarAlmacenUseCase } from '../../aplication/use-cases/actualizar-almacen.use-case';
import { EliminarAlmacenUseCase } from '../../aplication/use-cases/eliminar-almacen.use-case';
import { CrearAlmacenDto } from '../../aplication/dto/crear-almacen.dto';

@Controller('almacenes')
export class AlmacenController {
  constructor(
    private readonly crearAlmacenUseCase: CrearAlmacenUseCase,
    private readonly obtenerAlmacenesUseCase: ObtenerAlmacenesUseCase,
    private readonly obtenerAlmacenPorIdUseCase: ObtenerAlmacenPorIdUseCase,
    private readonly actualizarAlmacenUseCase: ActualizarAlmacenUseCase,
    private readonly eliminarAlmacenUseCase: EliminarAlmacenUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearAlmacenDto) {
    return await this.crearAlmacenUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.obtenerAlmacenesUseCase.execute();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.obtenerAlmacenPorIdUseCase.execute(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CrearAlmacenDto>,
  ) {
    return await this.actualizarAlmacenUseCase.execute(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.eliminarAlmacenUseCase.execute(id);
  }
}