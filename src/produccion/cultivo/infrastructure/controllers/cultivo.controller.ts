import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CrearCultivoUseCase } from "../../application/use-cases/crear-cultivo.use-case";
import { ListarCultivoUseCase } from "../../application/use-cases/listar-cultivo.use-case";
import { ObtenerCultivoUseCase } from "../../application/use-cases/obtener-cultivo.use-case";
import { ActualizarCultivoUseCase } from "../../application/use-cases/actualizar-cultivo.use-case";
import { CrearCultivoDto } from "../../application/dto/crear-cultivo.dto";
import { ActualizarCultivoDto } from "../../application/dto/actualizar-cultivo.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { AdminGuard } from "../../../../identidad/usuarios/infraestructure/security/admin.guard";
import { EliminacionTerritorioService } from "../../../../territorio/eliminacion/eliminacion-territorio.service";

@Controller("cultivos")
export class CultivoController {
  constructor(
    private readonly crearCultivoUseCase: CrearCultivoUseCase,
    private readonly listarCultivoUseCase: ListarCultivoUseCase,
    private readonly obtenerCultivoUseCase: ObtenerCultivoUseCase,
    private readonly actualizarCultivoUseCase: ActualizarCultivoUseCase,
    private readonly eliminacion: EliminacionTerritorioService,
  ) {}

  @Post()
  async crear(@Body() dto: CrearCultivoDto) {
    return await this.crearCultivoUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarCultivoUseCase.execute();
  }

  @Get(":id")
  async obtener(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerCultivoUseCase.execute(id);
  }

  // PROTEGIDO: el token identifica quién hizo el cambio para el historial
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: ActualizarCultivoDto,
    @Req() req: { user: { userId: number | string } },
  ) {
    return await this.actualizarCultivoUseCase.execute(id, dto, Number(req.user.userId));
  }

  // Solo el administrador; no se elimina un cultivo con actividades, cosechas, ventas, etc.
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminacion.eliminar("cultivo", id);
  }
}
