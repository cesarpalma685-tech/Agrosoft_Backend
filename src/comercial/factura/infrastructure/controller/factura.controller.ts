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
import { CrearFacturaUseCase } from "../../application/use-cases/crear-factura.use-case";
import { ListarFacturasUseCase } from "../../application/use-cases/listar-facturas.use-case";
import { ActualizarFacturaUseCase } from "../../application/use-cases/actualizar-factura.use-case";
import { EliminarFacturaUseCase } from "../../application/use-cases/eliminar-factura.use-case";
import { CrearFacturaDto } from "../../application/dto/crear-factura.dto";
import { ObtenerFacturaPorIdUseCase } from "../../application/use-cases/obtener-factura.use-case";

@Controller("facturas")
export class FacturaController {
  constructor(
    private readonly crearUseCase: CrearFacturaUseCase,
    private readonly listarUseCase: ListarFacturasUseCase,
    private readonly obtenerPorIdUseCase: ObtenerFacturaPorIdUseCase,
    private readonly actualizarUseCase: ActualizarFacturaUseCase,
    private readonly eliminarUseCase: EliminarFacturaUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearFacturaDto) {
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodas() {
    return await this.listarUseCase.execute;
  }

  @Get(":id")
  async obtenerPorId(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerPorIdUseCase.execute(id);
  }

  @Put(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: Partial<CrearFacturaDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}
