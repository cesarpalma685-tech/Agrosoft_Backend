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

import { CrearLoteDto } from "../../application/dto/crear-lote.dto";
import { ActualizarLoteDto } from "../../application/dto/actualizar-lote.dto";

import { CrearLoteUseCase } from "../../application/use-cases/crear-lote.use-case";
import { ListarLotesUseCase } from "../../application/use-cases/listar-lotes.use-case";
import { ObtenerLotePorIdUseCase } from "../../application/use-cases/obtener-lote-por-id.use-case";
import { ActualizarLoteUseCase } from "../../application/use-cases/actualizar-lote.use-case";
import { EliminarLoteUseCase } from "../../application/use-cases/eliminar-lote.use-case";

@Controller("lotes")
export class LoteController {
  constructor(
    private readonly crearLoteUseCase: CrearLoteUseCase,
    private readonly listarLotesUseCase: ListarLotesUseCase,
    private readonly obtenerLotePorIdUseCase: ObtenerLotePorIdUseCase,
    private readonly actualizarLoteUseCase: ActualizarLoteUseCase,
    private readonly eliminarLoteUseCase: EliminarLoteUseCase,
    private readonly eliminacion: EliminacionTerritorioService,
  ) {}

  @Post()
  crear(@Body() dto: CrearLoteDto) {
    return this.crearLoteUseCase.execute(dto);
  }

  @Get()
  listar() {
    return this.listarLotesUseCase.execute();
  }

  @Get(":id")
  obtenerPorId(@Param("id") id: string) {
    return this.obtenerLotePorIdUseCase.execute(Number(id));
  }

  @Patch(":id")
  actualizar(@Param("id") id: string, @Body() dto: ActualizarLoteDto) {
    return this.actualizarLoteUseCase.execute(Number(id), dto);
  }

  // Solo el administrador; no se elimina un lote con sublotes, cultivos o sensores
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminacion.eliminar("lote", id);
  }
}
