import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { CrearSubloteUseCase } from "../../application/use-cases/crear-sublote.use-case";
import { ActualizarSubloteUseCase } from "../../application/use-cases/actualizar-sublote.use-case";
import { EliminarSubloteUseCase } from "../../application/use-cases/eliminar-sublote.use-case";
import { ListarSublotesUseCase } from "../../application/use-cases/listar-sublote.use-case";
import { ObtenerSublotePorIdUseCase } from "../../application/use-cases/obtener-sublote-por-id.use-case";

import { CrearSubloteDto } from "../../application/dto/crear-sublote.dto";

@Controller("sublotes")
export class SubloteController {
  constructor(
    private readonly crearSubloteUseCase: CrearSubloteUseCase,
    private readonly actualizarSubloteUseCase: ActualizarSubloteUseCase,
    private readonly eliminarSubloteUseCase: EliminarSubloteUseCase,
    private readonly listarSublotesUseCase: ListarSublotesUseCase,
    private readonly obtenerSubloteUseCase: ObtenerSublotePorIdUseCase,
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
    @Body() datos: Partial<CrearSubloteDto>,
  ) {
    return await this.actualizarSubloteUseCase.execute(id, datos);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarSubloteUseCase.execute(id);
  }
}
