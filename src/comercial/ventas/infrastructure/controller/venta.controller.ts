import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ConsultarVentasUseCase } from "../../application/use-cases/consultar-ventas.use-case";
import { RegistrarVentaUseCase } from "../../application/use-cases/registrar-venta.use-case";
import { RegistrarPagoVentaUseCase } from "../../application/use-cases/registrar-pago-venta.use-case";
import { AnularVentaUseCase } from "../../application/use-cases/anular-venta.use-case";
import { AnularVentaDto, CrearVentaDto, RegistrarPagoDto } from "../../application/dto/crear-venta.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

type ReqUsuario = { user: { userId: number | string } };

@Controller("ventas")
export class VentaController {
  constructor(
    private readonly consultar: ConsultarVentasUseCase,
    private readonly registrar: RegistrarVentaUseCase,
    private readonly registrarPago: RegistrarPagoVentaUseCase,
    private readonly anular: AnularVentaUseCase,
  ) {}

  // PROTEGIDO: el token dice quién vende. Descuenta el stock y genera la factura.
  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CrearVentaDto, @Req() req: ReqUsuario) {
    return this.registrar.execute(dto, Number(req.user.userId));
  }

  @Get()
  listar() {
    return this.consultar.listar();
  }

  // PÚBLICO: lo abre quien escanea el QR de la factura (el código lleva una firma)
  @Get("factura-publica/:codigo")
  facturaPublica(@Param("codigo") codigo: string) {
    return this.consultar.facturaPublica(codigo);
  }

  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.consultar.obtener(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/pagos")
  pagar(@Param("id", ParseIntPipe) id: number, @Body() dto: RegistrarPagoDto) {
    return this.registrarPago.execute(id, dto);
  }

  // PROTEGIDO: reintegra los kg y deja quién y cuándo anuló
  @UseGuards(JwtAuthGuard)
  @Post(":id/anular")
  anularVenta(@Param("id", ParseIntPipe) id: number, @Body() dto: AnularVentaDto, @Req() req: ReqUsuario) {
    return this.anular.execute(id, dto.motivo, Number(req.user.userId));
  }
}
