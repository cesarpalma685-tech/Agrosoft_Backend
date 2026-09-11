import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";

import { CrearActividadInsumoUseCase } from "../../application/use-cases/registrar-actividad-insumo.use-case";
import { ListarActividadInsumosUseCase } from "../../application/use-cases/listar-actividad-insumos.use-case";
import { CrearActividadInsumoDto } from "../../application/dto/actividad_insumo.dto";

@Controller("actividades/:actividadId/insumos")
export class ActividadInsumoController {
  constructor(
    private readonly crearUseCase: CrearActividadInsumoUseCase,
    private readonly listarUseCase: ListarActividadInsumosUseCase,
  ) {}

  @Post()
  async save(
    @Param("actividadId", ParseIntPipe) actividadId: number,
    @Body() dto: CrearActividadInsumoDto,
  ) {
    dto.actividadId = actividadId;
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.listarUseCase.execute();
  }
}
