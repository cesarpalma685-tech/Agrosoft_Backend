import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CrearVentaUseCase } from "../../application/use-cases/crear-venta.use-case";
import { ListarVentasUseCase } from "../../application/use-cases/listar-ventas.use-case";
import { ObtenerVentaPorIdUseCase } from "../../application/use-cases/obtener-venta.use-case";
import { ActualizarVentaUseCase } from "../../application/use-cases/actualizar-venta.use-case";
import { EliminarVentaUseCase } from "../../application/use-cases/eliminar-venta.use-case";
import { CrearVentaDto } from "../../application/dto/crear-venta.dto";

@Controller('ventas')
export class VentaController {
  constructor(
    private readonly crearUseCase: CrearVentaUseCase,
    private readonly listarUseCase: ListarVentasUseCase,
    private readonly obtenerPorIdUseCase: ObtenerVentaPorIdUseCase,
    private readonly actualizarUseCase: ActualizarVentaUseCase,
    private readonly eliminarUseCase: EliminarVentaUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearVentaDto) {
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodas() {
    return await this.listarUseCase.execute();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.obtenerPorIdUseCase.execute(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CrearVentaDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}