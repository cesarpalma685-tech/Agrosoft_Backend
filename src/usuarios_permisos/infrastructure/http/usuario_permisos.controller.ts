import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';

import { CrearUsuarioPermisoUseCase } from '../../application/use-cases/crear-usuario_permisos.usecase';
import { ActualizarUsuarioPermisoUseCase } from '../../application/use-cases/actualizar-usuario_permisos.usecase';
import { EliminarUsuarioPermisoUseCase } from '../../application/use-cases/eliminar-usuario_permisos.usecase';

import { CreateUsuarioPermisoDto } from './dto/create-usuario_permisos.dto';
import { UpdateUsuarioPermisoDto } from './dto/update-usuario_permisos.dto';

@Controller('usuario-permisos')
export class UsuarioPermisosController {
constructor(
    private readonly crearUsuarioPermiso: CrearUsuarioPermisoUseCase,
    private readonly actualizarUsuarioPermiso: ActualizarUsuarioPermisoUseCase,
    private readonly eliminarUsuarioPermiso: EliminarUsuarioPermisoUseCase,
) {}

@Post()
crear(@Body() dto: CreateUsuarioPermisoDto) {
return this.crearUsuarioPermiso.ejecutar(dto);
}

@Patch(':id')
actualizar(
@Param('id', ParseIntPipe) id: number,
@Body() dto: UpdateUsuarioPermisoDto,
) {
return this.actualizarUsuarioPermiso.ejecutar(id, dto);
}

@Delete(':id')
eliminar(@Param('id', ParseIntPipe) id: number) {
this.eliminarUsuarioPermiso.ejecutar(id);
}
}