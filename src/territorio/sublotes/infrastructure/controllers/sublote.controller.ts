import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { AdminGuard } from "../../../../identidad/usuarios/infraestructure/security/admin.guard";
import { EliminacionTerritorioService } from "../../../eliminacion/eliminacion-territorio.service";

import { CrearSubloteUseCase } from "../../application/use-cases/crear-sublote.use-case";
import { ActualizarSubloteUseCase } from "../../application/use-cases/actualizar-sublote.use-case";
import { EliminarSubloteUseCase } from "../../application/use-cases/eliminar-sublote.use-case";
import { ListarSublotesUseCase } from "../../application/use-cases/listar-sublote.use-case";
import { ObtenerSublotePorIdUseCase } from "../../application/use-cases/obtener-sublote-por-id.use-case";

import { CrearSubloteDto } from "../../application/dto/crear-sublote.dto";
import { ActualizarSubloteDto } from "../../application/dto/actualizar-sublote.dto";

@Controller("sublotes")
export class SubloteController {
  constructor(
    private readonly crearSubloteUseCase: CrearSubloteUseCase,
    private readonly actualizarSubloteUseCase: ActualizarSubloteUseCase,
    private readonly eliminarSubloteUseCase: EliminarSubloteUseCase,
    private readonly listarSublotesUseCase: ListarSublotesUseCase,
    private readonly obtenerSubloteUseCase: ObtenerSublotePorIdUseCase,
    private readonly eliminacion: EliminacionTerritorioService,
  ) {}

  @Post()
  async crear(@Body() dto: CrearSubloteDto) {
    return await this.crearSubloteUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarSublotesUseCase.execute();
  }

  @Get(":id")
  async obtener(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerSubloteUseCase.execute(id);
  }

  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() datos: ActualizarSubloteDto,
  ) {
    return await this.actualizarSubloteUseCase.execute(id, datos);
  }

  // Solo el administrador; no se elimina un sublote con cultivos o sensores
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminacion.eliminar("sublote", id);
  }
}
