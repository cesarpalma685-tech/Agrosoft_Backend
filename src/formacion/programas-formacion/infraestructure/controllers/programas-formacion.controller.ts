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
import { DataSource } from "typeorm";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { AdminGuard } from "../../../../identidad/usuarios/infraestructure/security/admin.guard";
import { UsuarioOrmEntity } from "../../../../identidad/usuarios/infraestructure/persistence/usuario.orm-entity";
import { ProgramaFormacionRepository } from "../../aplication/ports/programa-formacion.repository";
import { ProgramaFormacion } from "../../domain/entities/programa-formacion.entity";

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
    private readonly repository: ProgramaFormacionRepository,
    private readonly dataSource: DataSource,
  ) {}

  private vista(p: ProgramaFormacion, aprendices: number) {
    return {
      id: p.id,
      numeroFicha: p.numeroFicha,
      nombre: p.nombre,
      nombreLabel: PROGRAMA_FORMACION_LABELS[p.nombre],
      tipo: p.tipo ?? null,
      fechaInicio: p.fechaInicio ?? null,
      fechaFin: p.fechaFin ?? null,
      estado: p.estado,
      // Aprendices reales con esa ficha; si no hay, el número registrado
      aprendices: aprendices || p.cantidadAprendices,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listar() {
    const programas = await this.repository.listar();
    const usuarios = await this.dataSource.getRepository(UsuarioOrmEntity).find({ select: { id: true, idFicha: true } });
    return programas.map((p) => this.vista(p, usuarios.filter((u) => u.idFicha != null && String(u.idFicha) === p.numeroFicha).length));
  }

  // Opciones para el <select> de programa de formación
  @Get("opciones")
  opciones() {
    return Object.values(ProgramaFormacionNombre).map((value) => ({
      value,
      label: PROGRAMA_FORMACION_LABELS[value],
    }));
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async crear(@Body() dto: CreateProgramaFormacionDto) {
    return this.vista(await this.crearPrograma.ejecutar(dto), 0);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProgramaFormacionDto,
  ) {
    return this.vista(await this.actualizarPrograma.ejecutar(id, dto), 0);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarPrograma.ejecutar(id);
  }
}
