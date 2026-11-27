import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ListarTransaccionesUseCase, RegistrarTransaccionManualUseCase } from "../../application/use-cases/transacciones.use-cases";
import { GenerarTransaccionesUseCase } from "../../application/use-cases/generar-transacciones.use-case";
import { CrearTransaccionFinancieraDto } from "../../application/dto/crear-transaccion-financiera.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

type ReqUsuario = { user: { userId: number | string } };

@Controller("transacciones-financieras")
export class TransaccionFinancieraController {
  constructor(
    private readonly listar: ListarTransaccionesUseCase,
    private readonly registrarManual: RegistrarTransaccionManualUseCase,
    private readonly generar: GenerarTransaccionesUseCase,
  ) {}

  @Get()
  obtenerTodas() {
    return this.listar.execute();
  }

  // PROTEGIDO: el token dice quién registró la transacción
  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CrearTransaccionFinancieraDto, @Req() req: ReqUsuario) {
    return this.registrarManual.execute(dto, Number(req.user.userId));
  }

  // PROTEGIDO: genera las transacciones de ventas, compras y actividades sin duplicar las que ya existen
  @UseGuards(JwtAuthGuard)
  @Post("generar")
  generarAutomaticas(@Req() req: ReqUsuario) {
    return this.generar.execute(Number(req.user.userId));
  }
}
