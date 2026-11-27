import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { MonitoreoIotService } from "../application/monitoreo.service";
import { ActualizarSensorDto, CrearSensorDto, GuardarConfigDto, LecturaManualDto, ProbarConexionDto, RegistrarLecturaDto } from "../application/dto/monitoreo.dto";
import { JwtAuthGuard } from "../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

type ReqUsuario = { user: { userId: number | string } };

@Controller("sensores")
export class SensoresController {
  constructor(private readonly servicio: MonitoreoIotService) {}

  @Get()
  listar() {
    return this.servicio.listarSensores();
  }

  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.obtenerSensor(id);
  }

  // Lecturas del sensor en las últimas N horas (por defecto 24)
  @Get(":id/lecturas")
  historial(@Param("id", ParseIntPipe) id: number, @Query("horas") horas?: string) {
    return this.servicio.historial(id, Math.min(Math.max(Number(horas) || 24, 1), 24 * 90));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CrearSensorDto, @Req() req: ReqUsuario) {
    return this.servicio.crearSensor(dto, Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarSensorDto) {
    return this.servicio.actualizarSensor(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.eliminarSensor(id);
  }

  // PROTEGIDO: lectura escrita a mano desde la aplicación (útil para probar un sensor)
  @UseGuards(JwtAuthGuard)
  @Post(":id/lecturas")
  lecturaManual(@Param("id", ParseIntPipe) id: number, @Body() dto: LecturaManualDto) {
    return this.servicio.registrarLectura({ sensor_id: id, valor: dto.valor, observaciones: dto.observaciones ?? "Lectura manual" });
  }
}

@Controller("sensor-lecturas")
export class LecturasController {
  constructor(private readonly servicio: MonitoreoIotService) {}

  // Entrada para los dispositivos de la red local. Si se define IOT_API_KEY en el servidor, deben enviarla
  // en el encabezado x-api-key.
  @Post()
  recibir(@Body() dto: RegistrarLecturaDto, @Headers("x-api-key") clave?: string) {
    const requerida = process.env.IOT_API_KEY;
    if (requerida && clave !== requerida) throw new UnauthorizedException("Clave de dispositivo inválida");
    return this.servicio.registrarLectura(dto);
  }
}

@Controller("sensor-alertas")
export class AlertasController {
  constructor(private readonly servicio: MonitoreoIotService) {}

  @Get()
  listar() {
    return this.servicio.listarAlertas();
  }
}

@Controller("iot-global-config")
export class ConfigIotController {
  constructor(private readonly servicio: MonitoreoIotService) {}

  @Get()
  listar() {
    return this.servicio.listarConfigs();
  }

  @UseGuards(JwtAuthGuard)
  @Post("probar")
  probar(@Body() dto: ProbarConexionDto) {
    return this.servicio.probarConexion(dto.broker, dto.port);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: GuardarConfigDto) {
    return this.servicio.guardarConfig(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: GuardarConfigDto) {
    return this.servicio.guardarConfig(dto, id);
  }
}
