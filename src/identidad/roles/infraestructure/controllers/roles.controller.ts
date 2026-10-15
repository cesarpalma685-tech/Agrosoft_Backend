import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";

import { ActualizarRolUseCase } from "../../aplication/use-cases/actualizar-rol.usecase";
import { EliminarRolUseCase } from "../../aplication/use-cases/eliminar-rol.usecase";

import { UpdateRolDto } from "../../aplication/dto/update-rol.dto";
import {
  ROL_NOMBRE_LABELS,
  ROLES_ASIGNABLES_EN_REGISTRO,
} from "../../domain/enums/rol-nombre.enum";

@Controller("roles")
export class RolesController {
  constructor(
    private readonly actualizarRol: ActualizarRolUseCase,
    private readonly eliminarRol: EliminarRolUseCase,
  ) {}

  // Opciones para el <select> de rol en el registro (sin Administrador)
  @Get("opciones")
  opciones() {
    return ROLES_ASIGNABLES_EN_REGISTRO.map((value) => ({
      value,
      label: ROL_NOMBRE_LABELS[value],
    }));
  }

  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRolDto) {
    return this.actualizarRol.ejecutar(id, dto);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarRol.ejecutar(id);
  }
}
