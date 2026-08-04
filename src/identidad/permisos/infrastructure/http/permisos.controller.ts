import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CrearPermisoUseCase } from '../../application/use-cases/crear-permiso.usecase';
import { ActualizarPermisoUseCase } from '../../application/use-cases/actualizar-permiso.usecase';
import { EliminarPermisoUseCase } from '../../application/use-cases/eliminar-permiso.usecase';

import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto'



@Controller('permisos')
export class PermisosController {
  constructor(
    private readonly crearPermiso: CrearPermisoUseCase,
    private readonly actualizarPermiso: ActualizarPermisoUseCase,
    private readonly eliminarPermiso: EliminarPermisoUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreatePermisoDto) {
    return this.crearPermiso.ejecutar(dto);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePermisoDto,
  ) {
    return this.actualizarPermiso.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarPermiso.ejecutar(id);
  }
}