import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CrearHistorialPrecioLoteUseCase } from "../../application/use-cases/crear-historial-precio-lote.use-case";
import { ListarHistorialPreciosLoteUseCase } from "../../application/use-cases/listar-historial-precios-lote.use-case";
import { ActualizarHistorialPrecioLoteUseCase } from "../../application/use-cases/actualizar-historial-precio-lote.use-case";
import { EliminarHistorialPrecioLoteUseCase } from "../../application/use-cases/eliminar-historial-precio-lote.use-case";
import { CrearHistorialPrecioLoteDto } from "../../application/dto/crear-historial-precio-lote.dto";
import { ObtenerHistorialPrecioLotePorIdUseCase } from "../../application/use-cases/obtener-historial-precio-lote.use-case";

@Controller("historial-precios-lote")
export class HistorialPrecioLoteController {
  constructor(
    private readonly crearUseCase: CrearHistorialPrecioLoteUseCase,
    private readonly listarUseCase: ListarHistorialPreciosLoteUseCase,
    private readonly obtenerPorIdUseCase: ObtenerHistorialPrecioLotePorIdUseCase,
    private readonly actualizarUseCase: ActualizarHistorialPrecioLoteUseCase,
    private readonly eliminarUseCase: EliminarHistorialPrecioLoteUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearHistorialPrecioLoteDto) {
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodos() {
    return await this.listarUseCase.execute();
  }

  @Get(":id")
  async obtenerPorId(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerPorIdUseCase.execute(id);
  }

  @Put(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: Partial<CrearHistorialPrecioLoteDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}
