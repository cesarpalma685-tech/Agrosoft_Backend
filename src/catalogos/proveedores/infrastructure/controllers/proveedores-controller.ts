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

import { ProveedoresDto } from '../../application/dto/crear-proveedores.dto';
import { CrearProveedoresUseCase } from '../../application/use-cases/crear-proveedores.use-case';
import { ListarProveedoresUseCase } from '../../application/use-cases/listar-proveedores.use-case';
import { ObtenerProveedoresUseCase } from '../../application/use-cases/obtener-proveedores-por-id.use-case';
import { ActualizarProveedoresUseCase } from '../../application/use-cases/actualizar-proveedores.use-case';
import { EliminarProveedoresUseCase } from '../../application/use-cases/eliminar-proveedores-por-id.use-case';

@Controller('proveedores')
export class ProveedoresController {
  constructor(
    private readonly crearUseCase: CrearProveedoresUseCase,
    private readonly listarUseCase: ListarProveedoresUseCase,
    private readonly obtenerUseCase: ObtenerProveedoresUseCase,
    private readonly actualizarUseCase: ActualizarProveedoresUseCase,
    private readonly eliminarUseCase: EliminarProveedoresUseCase,
  ) {}

  @Post()
  crear(@Body() proveedor: ProveedoresDto) {
    return this.crearUseCase.ejecutar(proveedor);
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
    @Body() datos: Partial<ProveedoresDto>,
  ) {
    return this.actualizarUseCase.ejecutar(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.ejecutar(id);
  }
}