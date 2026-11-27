import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { RegistrarMovimientoInsumoUseCase } from "../../application/use-cases/crear-movimiento-insumo.use-case";
import { MovimientoInsumoRepositoryPort } from "../../application/ports/crear-movimiento-insumo.repository.port";
import { CrearMovimientoIsumoDto } from "../../application/dto/crear-movimiento-insumo.dto";
@Controller("movimientos-insumos")
export class MovimientoInsumoController {
  constructor(
    private readonly registrarMovimientoUseCase: RegistrarMovimientoInsumoUseCase,
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
  ) {}

  // PROTEGIDO: el token dice quién registró el movimiento
  @UseGuards(JwtAuthGuard)
  @Post()
  async registrar(
    @Body() dto: CrearMovimientoIsumoDto,
    @Req() req: { user: { userId: number | string } },
  ) {
    return await this.registrarMovimientoUseCase.execute(dto, Number(req.user.userId));
  }

  @Get()
  async obtenerTodos() {
    return await this.movimientoRepository.findAll();
  }

  @Get("insumo/:insumoId")
  async obtenerPorInsumo(@Param("insumoId", ParseIntPipe) insumoId: number) {
    return await this.movimientoRepository.findByInsumoId(insumoId);
  }
}
