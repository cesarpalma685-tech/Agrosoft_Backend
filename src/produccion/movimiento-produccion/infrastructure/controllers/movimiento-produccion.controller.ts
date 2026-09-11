import { Body, Controller, Get, Post } from "@nestjs/common";
import { CrearMovimientoProduccionUseCase } from "../../application/use-cases/crear-movimiento-produccion.use-case";
import { ListarMovimientoProduccionUseCase } from "../../application/use-cases/listar-movimiento-produccion.use-case";
import { CrearMovimientoProduccionDto } from "../../application/dto/crear-movimiento-produccion.dto";

@Controller("movimientos-produccion")
export class MovimientoProduccionController {
  constructor(
    private readonly crearMovimientoProduccionUseCase: CrearMovimientoProduccionUseCase,
    private readonly listarMovimientoProduccionUseCase: ListarMovimientoProduccionUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearMovimientoProduccionDto) {
    return await this.crearMovimientoProduccionUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarMovimientoProduccionUseCase.execute();
  }
}
