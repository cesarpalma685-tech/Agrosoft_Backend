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

import { CrearTiposSensoresUseCase } from "../../application/use-cases/crear-tipos_sensores.use-case";
import { ActualizarTiposSensoresUseCase } from "../../application/use-cases/actualizar-tipos_sensores.use-case";
import { EliminarTiposSensoresUseCase } from "../../application/use-cases/eliminar-tipos_sensores-por-id.use-case";
import { ListarTiposSensoresUseCase } from "../../application/use-cases/listar-tipos_sensores.use-case";
import { ObtenerTiposSensoresPorIdUseCase } from "../../application/use-cases/obtener-tipos_sensores-por-id.use-case";

import { CrearTipoSensoresDto } from "../../application/dto/crear-tipos_sensores.dto";

@Controller("tipos-sensores")
export class TiposSensoresController {
  constructor(
    private readonly crearTiposSensoresUseCase: CrearTiposSensoresUseCase,
    private readonly actualizarTiposSensoresUseCase: ActualizarTiposSensoresUseCase,
    private readonly eliminarTiposSensoresUseCase: EliminarTiposSensoresUseCase,
    private readonly listarTiposSensoresUseCase: ListarTiposSensoresUseCase,
    private readonly obtenerTiposSensoresPorIdUseCase: ObtenerTiposSensoresPorIdUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearTipoSensoresDto) {
    return await this.crearTiposSensoresUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarTiposSensoresUseCase.execute();
  }

  @Get(":id")
  async obtener(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerTiposSensoresPorIdUseCase.execute(id);
  }

  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() datos: Partial<CrearTipoSensoresDto>,
  ) {
    return await this.actualizarTiposSensoresUseCase.execute(id, datos);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarTiposSensoresUseCase.execute(id);
  }
}
