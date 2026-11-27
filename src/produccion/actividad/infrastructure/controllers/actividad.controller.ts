import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CrearActividadUseCase } from "../../application/use-cases/crear-actividad.use-case";
import { ListarActividadUseCase } from "../../application/use-cases/listar-actividad.use-case";
import { ActualizarActividadUseCase } from "../../application/use-cases/actualizar-actividad.use-case";
import { RegistrarServicioUseCase } from "../../application/use-cases/registrar-servicio.use-case";
import { CompletarActividadUseCase } from "../../application/use-cases/completar-actividad.use-case";
import { ActualizarActividadDto, CompletarActividadDto, CrearActividadDto, RegistrarServicioDto } from "../../application/dto/crear-actividad.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

type ReqUsuario = { user: { userId: number | string } };

@Controller("actividades")
export class ActividadController {
  constructor(
    private readonly crearActividadUseCase: CrearActividadUseCase,
    private readonly listarActividadUseCase: ListarActividadUseCase,
    private readonly actualizarActividadUseCase: ActualizarActividadUseCase,
    private readonly completarActividadUseCase: CompletarActividadUseCase,
    private readonly registrarServicioUseCase: RegistrarServicioUseCase,
  ) {}

  // PROTEGIDO: el token dice quién registró la actividad
  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() dto: CrearActividadDto, @Req() req: ReqUsuario) {
    return await this.crearActividadUseCase.execute(dto, Number(req.user.userId));
  }

  @Get()
  async listar() {
    return await this.listarActividadUseCase.execute();
  }

  @Get(":id")
  async obtener(@Param("id", ParseIntPipe) id: number) {
    return await this.listarActividadUseCase.obtener(id);
  }

  // PROTEGIDO: agrega un servicio o maquinaria contratada y suma su costo al cultivo
  @UseGuards(JwtAuthGuard)
  @Post(":id/servicios")
  async registrarServicio(@Param("id", ParseIntPipe) id: number, @Body() dto: RegistrarServicioDto) {
    return await this.registrarServicioUseCase.execute(id, dto);
  }

  // PROTEGIDO: cierra la actividad (descuenta lo usado, libera la reserva y genera costos)
  @UseGuards(JwtAuthGuard)
  @Post(":id/completar")
  async completar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CompletarActividadDto,
    @Req() req: ReqUsuario,
  ) {
    return await this.completarActividadUseCase.execute(id, dto, Number(req.user.userId));
  }

  // PROTEGIDO: el cambio queda en el historial con el usuario del token
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: ActualizarActividadDto,
    @Req() req: ReqUsuario,
  ) {
    return await this.actualizarActividadUseCase.execute(id, dto, Number(req.user.userId));
  }
}
