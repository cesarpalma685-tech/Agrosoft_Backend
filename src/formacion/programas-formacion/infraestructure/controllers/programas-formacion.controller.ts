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

import { CrearProgramaFormacionUseCase } from "../../aplication/use-cases/crear-programa-formacion.usecase";
import { ActualizarProgramaFormacionUseCase } from "../../aplication/use-cases/actualizar-programa-formacion.usecase";
import { EliminarProgramaFormacionUseCase } from "../../aplication/use-cases/eliminar-programa-formacion.usecase";

import { CreateProgramaFormacionDto } from "../../aplication/dto/create-programa-formacion.dto";
import { UpdateProgramaFormacionDto } from "../../aplication/dto/update-programa-formacion.dto";
import {
  PROGRAMA_FORMACION_LABELS,
  ProgramaFormacionNombre,
} from "../../domain/enums/programa-formacion-nombre.enum";

@Controller("programas-formacion")
export class ProgramasFormacionController {
  constructor(
    private readonly crearPrograma: CrearProgramaFormacionUseCase,
    private readonly actualizarPrograma: ActualizarProgramaFormacionUseCase,
    private readonly eliminarPrograma: EliminarProgramaFormacionUseCase,
  ) {}

  // Opciones para el <select> de programa de formación
  @Get("opciones")
  opciones() {
    return Object.values(ProgramaFormacionNombre).map((value) => ({
      value,
      label: PROGRAMA_FORMACION_LABELS[value],
    }));
  }

  @Post()
  crear(@Body() dto: CreateProgramaFormacionDto) {
    return this.crearPrograma.ejecutar(dto);
  }

  @Patch(":id")
  actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProgramaFormacionDto,
  ) {
    return this.actualizarPrograma.ejecutar(id, dto);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarPrograma.ejecutar(id);
  }
}
