import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';

import { CrearRolPermisoUseCase } from '../../aplication/use-cases/crear-permiso.usecase';
import { ActualizarRolPermisoUseCase } from '../../aplication/use-cases/actualizar-permiso.usecase';
import { EliminarRolPermisoUseCase } from '../../aplication/use-cases/eliminar-permiso.usecase';

import { CreateRolPermisoDto } from '../../aplication/dto/create-rol_permisos.dto';
import { UpdateRolPermisoDto } from '../../aplication/dto/update-rol_permisos.dto';

@Controller('rol-permisos')
export class RolPermisosController {

  constructor(
    private readonly crearRolPermiso: CrearRolPermisoUseCase,
    private readonly actualizarRolPermiso: ActualizarRolPermisoUseCase,
    private readonly eliminarRolPermiso: EliminarRolPermisoUseCase,
  ) {}

  @Post()
  crear(
    @Body() dto: CreateRolPermisoDto,
  ) {
    return this.crearRolPermiso.ejecutar(dto);
  }


  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolPermisoDto,
  ) {
    return this.actualizarRolPermiso.ejecutar(id, dto);
  }


  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.eliminarRolPermiso.ejecutar(id);
  }

}