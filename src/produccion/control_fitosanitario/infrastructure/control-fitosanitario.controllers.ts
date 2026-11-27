import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ControlFitosanitarioService } from "../application/control-fitosanitario.service";
import {
  ActualizarContingenciaDto,
  ActualizarTratamientoDto,
  CrearContingenciaDto,
  CrearTratamientoDto,
  DecidirAprobacionDto,
} from "../application/dto/control-fitosanitario.dto";
import { JwtAuthGuard } from "../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

type ReqUsuario = { user: { userId: number | string } };

@Controller("contingencias")
export class ContingenciasController {
  constructor(private readonly servicio: ControlFitosanitarioService) {}

  @Get()
  listar() {
    return this.servicio.listarContingencias();
  }

  // Con las fotografías de las evidencias
  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.obtenerContingencia(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CrearContingenciaDto, @Req() req: ReqUsuario) {
    return this.servicio.crearContingencia(dto, Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarContingenciaDto) {
    return this.servicio.actualizarContingencia(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.eliminarContingencia(id);
  }
}

@Controller("tratamientos-fitosanitarios")
export class TratamientosController {
  constructor(private readonly servicio: ControlFitosanitarioService) {}

  @Get()
  listar() {
    return this.servicio.listarTratamientos();
  }

  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.obtenerTratamiento(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CrearTratamientoDto, @Req() req: ReqUsuario) {
    return this.servicio.crearTratamiento(dto, Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarTratamientoDto) {
    return this.servicio.actualizarTratamiento(id, dto);
  }

  // PROTEGIDO y solo para el administrador
  @UseGuards(JwtAuthGuard)
  @Post(":id/aprobacion")
  decidir(@Param("id", ParseIntPipe) id: number, @Body() dto: DecidirAprobacionDto, @Req() req: ReqUsuario) {
    return this.servicio.decidirAprobacion(id, dto, Number(req.user.userId));
  }
}
