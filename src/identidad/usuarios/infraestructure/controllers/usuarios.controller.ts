import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GestionUsuariosService } from "../../aplication/gestion-usuarios.service";
import { ActualizarUsuarioAdminDto } from "../../aplication/dto/actualizar-usuario-admin.dto";
import { AdminGuard } from "../security/admin.guard";
import { CrearUsuarioUseCase } from "../../aplication/use-cases/crear-usuario.usecase";
import { CreateUsuarioDto } from "../../aplication/dto/create-usuario.dto";
import { CambiarPasswordDto } from "../../aplication/dto/cambiar-password.dto";
import { CambiarPasswordUseCase } from "../../aplication/use-cases/cambiar-password.usecase";
import { JwtAuthGuard } from "../security/jwt-auth.guard";

@Controller("usuarios")
export class UsuariosController {
  constructor(
    private readonly crearUsuario: CrearUsuarioUseCase,
    private readonly cambiarPassword: CambiarPasswordUseCase,
    private readonly gestion: GestionUsuariosService,
  ) {}

  // PROTEGIDO: lista pública de usuarios (para elegir responsables, etc.)
  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.gestion.listar();
  }

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.crearUsuario.ejecutar(dto);
  }

  // PROTEGIDO: cambia la contraseña del usuario dueño del token
  @UseGuards(JwtAuthGuard)
  @Patch("me/password")
  updatePassword(
    @Req() req: { user: { userId: number | string } },
    @Body() dto: CambiarPasswordDto,
  ) {
    return this.cambiarPassword.ejecutar(
      Number(req.user.userId),
      dto.passwordActual,
      dto.passwordNueva,
    );
  }

  // PROTEGIDO: Requiere token JWT
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarUsuarioAdminDto, @Req() req: { user: { userId: number | string } }) {
    return this.gestion.actualizar(id, dto, Number(req.user.userId));
  }

  // PROTEGIDO: solo administrador
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Req() req: { user: { userId: number | string } }) {
    return this.gestion.eliminar(id, Number(req.user.userId));
  }
}
