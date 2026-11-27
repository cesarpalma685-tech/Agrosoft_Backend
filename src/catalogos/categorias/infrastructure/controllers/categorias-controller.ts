import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { CategoriasDto } from "../../domain/entities/categorias.dto";
import { ActualizarCategoriasDto, CrearCategoriasDto } from "../../application/dto/crear-categorias.dto";

import { CrearCategoriasUseCase } from "../../application/use-cases/crear-categorias.use-case";
import { ListarCategoriasUseCase } from "../../application/use-cases/listar-categorias.use-case";
import { ObtenerCategoriaUseCase } from "../../application/use-cases/obtener-categorias-por-id.use-case";
import { ActualizarCategoriasUseCase } from "../../application/use-cases/actualizar-categorias.use-case";
import { EliminarCategoriaUseCase } from "../../application/use-cases/eliminar-categorias-por-id.use-case";

@Controller("categorias")
export class CategoriasController {
  constructor(
    private readonly crearCategoriasUseCase: CrearCategoriasUseCase,
    private readonly listarCategoriasUseCase: ListarCategoriasUseCase,
    private readonly obtenerCategoriasUseCase: ObtenerCategoriaUseCase,
    private readonly actualizarCategoriasUseCase: ActualizarCategoriasUseCase,
    private readonly eliminarCategoriasUseCase: EliminarCategoriaUseCase,
  ) {}

  @Post()
  async crear(@Body() datos: CrearCategoriasDto): Promise<CategoriasDto> {
    return await this.crearCategoriasUseCase.ejecutar({ ...datos, descripcion: datos.descripcion ?? "" } as CategoriasDto);
  }

  @Get()
  async listar(): Promise<CategoriasDto[]> {
    return await this.listarCategoriasUseCase.ejecutar();
  }

  @Get(":id")
  async obtener(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CategoriasDto | null> {
    return await this.obtenerCategoriasUseCase.ejecutar(id);
  }

  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() datos: ActualizarCategoriasDto,
  ): Promise<CategoriasDto | null> {
    return await this.actualizarCategoriasUseCase.ejecutar(id, datos);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    try {
      return await this.eliminarCategoriasUseCase.ejecutar(id);
    } catch {
      // La categoría la usan insumos o herramientas (llave foránea)
      throw new ConflictException("No se puede eliminar: hay productos que usan esta categoría");
    }
  }
}
