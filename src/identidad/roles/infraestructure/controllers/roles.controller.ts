import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { CrearRolUseCase } from "../../aplication/use-cases/crear-rol.usecase";
import { ActualizarRolUseCase } from "../../aplication/use-cases/actualizar-rol.usecase";
import { EliminarRolUseCase } from "../../aplication/use-cases/eliminar-rol.usecase";

import { CreateRolDto } from "../../aplication/dto/create-rol.dto";
import { UpdateRolDto } from "../../aplication/dto/update-rol.dto";

@Controller("roles")
export class RolesController {
  constructor(
    private readonly crearRol: CrearRolUseCase,
    private readonly actualizarRol: ActualizarRolUseCase,
    private readonly eliminarRol: EliminarRolUseCase,
  ) {}

  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRolDto) {
    return this.actualizarRol.ejecutar(id, dto);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarRol.ejecutar(id);
  }
}
