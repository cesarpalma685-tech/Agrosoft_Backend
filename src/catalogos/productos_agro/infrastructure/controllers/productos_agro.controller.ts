import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductosAgroDto } from '../../application/dto/crear-productos_agro.dto';
import { CrearProductosAgroUseCase } from '../../application/use-cases/crear-productos_agro.use-case';
import { ListarProductosAgroUseCase } from '../../application/use-cases/listar-productos_agro.use-case';
import { ObtenerProductosAgroUseCase } from '../../application/use-cases/obtener-productos_agro-por-id.use-case';
import { ActualizarProductosAgroUseCase } from '../../application/use-cases/actualizar-productos_agro.use-case';
import { EliminarProductosAgroUseCase } from '../../application/use-cases/eliminar-productos_agro-por-id.use-case';

@Controller('productos_agro')
export class ProductosAgroController {
  constructor(
    private readonly crearUseCase: CrearProductosAgroUseCase,
    private readonly listarUseCase: ListarProductosAgroUseCase,
    private readonly obtenerUseCase: ObtenerProductosAgroUseCase,
    private readonly actualizarUseCase: ActualizarProductosAgroUseCase,
    private readonly eliminarUseCase: EliminarProductosAgroUseCase,
  ) {}

  @Post()
  crear(@Body() producto: ProductosAgroDto) {
    return this.crearUseCase.ejecutar(producto);
  }

  @Get()
  listar() {
    return this.listarUseCase.ejecutar();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerUseCase.ejecutar(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<ProductosAgroDto>,
  ) {
    return this.actualizarUseCase.ejecutar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.ejecutar(id);
  }
}