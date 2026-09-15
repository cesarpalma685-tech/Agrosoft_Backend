import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { CrearPermisoUseCase } from "../../aplication/use-cases/crear-permiso.usecase";
import { ActualizarPermisoUseCase } from "../../aplication/use-cases/actualizar-permiso.usecase";
import { EliminarPermisoUseCase } from "../../aplication/use-cases/eliminar-permiso.usecase";

import { CreatePermisoDto } from "../../aplication/dto/create-permiso.dto";
import { UpdatePermisoDto } from "../../aplication/dto/update-permiso.dto";

@Controller("permisos")
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

  @Patch(":id")
  actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePermisoDto,
  ) {
    return this.actualizarPermiso.ejecutar(id, dto);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarPermiso.ejecutar(id);
  }
}
