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
import { CrearVentaDetalleUseCase } from "../../application/use-cases/crear-venta-detalle.use-case";
import { ListarVentasDetallesUseCase } from "../../application/use-cases/listar-ventas-detalles.use-case";
import { ActualizarVentaDetalleUseCase } from "../../application/use-cases/actualizar-venta-detalle.use-case";
import { ObtenerVentaDetallePorIdUseCase } from "../../application/use-cases/obtener-venta-detalle.use-case";
import { CrearVentaDetalleDto } from "../../application/dto/crear-venta-detalle.dto";
import { EliminarVentaDetalleUseCase } from "../../application/use-cases/eliminar.venta-detalle.use-case";

@Controller("ventas-detalles")
export class VentaDetalleController {
  constructor(
    private readonly crearUseCase: CrearVentaDetalleUseCase,
    private readonly listarUseCase: ListarVentasDetallesUseCase,
    private readonly obtenerPorIdUseCase: ObtenerVentaDetallePorIdUseCase,
    private readonly actualizarUseCase: ActualizarVentaDetalleUseCase,
    private readonly eliminarUseCase: EliminarVentaDetalleUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearVentaDetalleDto) {
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodas() {
    return await this.listarUseCase.execute();
  }

  @Get(":id")
  async obtenerPorId(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerPorIdUseCase.execute(id);
  }

  @Put(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: Partial<CrearVentaDetalleDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}
