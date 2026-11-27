import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { AdminGuard } from "../../../../identidad/usuarios/infraestructure/security/admin.guard";
import { EliminacionTerritorioService } from "../../../eliminacion/eliminacion-territorio.service";

import { CrearUnidadProductivaDto } from "../../application/dto/crear-unidad-productiva.dto";
import { ActualizarUnidadProductivaDto } from "../../application/dto/actualizar-unidad-productiva.dto";
import {
  ActualizarUnidadProductivaUseCase,
  CrearUnidadProductivaUseCase,
  EliminarUnidadProductivaUseCase,
  ListarUnidadesProductivasUseCase,
  ObtenerUnidadProductivaPorIdUseCase,
} from "../../application/use-cases/unidad-productiva.use-cases";

@Controller("unidades-productivas")
export class UnidadProductivaController {
  constructor(
    private readonly crearUseCase: CrearUnidadProductivaUseCase,
    private readonly listarUseCase: ListarUnidadesProductivasUseCase,
    private readonly obtenerUseCase: ObtenerUnidadProductivaPorIdUseCase,
    private readonly actualizarUseCase: ActualizarUnidadProductivaUseCase,
    private readonly eliminarUseCase: EliminarUnidadProductivaUseCase,
    private readonly eliminacion: EliminacionTerritorioService,
  ) {}

  @Post()
  crear(@Body() dto: CrearUnidadProductivaDto) {
    return this.crearUseCase.execute(dto);
  }

  @Get()
  listar() {
    return this.listarUseCase.execute();
  }

  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.obtenerUseCase.execute(id);
  }

  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarUnidadProductivaDto) {
    return this.actualizarUseCase.execute(id, dto);
  }

  // Solo el administrador; no se elimina una unidad con lotes (se borran también sus metas de producción)
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminacion.eliminar("unidad", id);
  }
}
