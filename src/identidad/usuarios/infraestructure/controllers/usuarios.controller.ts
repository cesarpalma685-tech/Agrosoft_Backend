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
import { CrearUsuarioUseCase } from "../../aplication/use-cases/crear-usuario.usecase";
import { ActualizarUsuarioUseCase } from "../../aplication/use-cases/actualizar-usuario.usecase";
import { EliminarUsuarioUseCase } from "../../aplication/use-cases/eliminar-usuario.usecase";
import { CreateUsuarioDto } from "../../aplication/dto/create-usuario.dto";
import { UpdateUsuarioDto } from "../../aplication/dto/update-usuario.dto";
import { CambiarPasswordDto } from "../../aplication/dto/cambiar-password.dto";
import { CambiarPasswordUseCase } from "../../aplication/use-cases/cambiar-password.usecase";
import { JwtAuthGuard } from "../security/jwt-auth.guard";

@Controller("usuarios")
export class UsuariosController {
  constructor(
    private readonly crearUsuario: CrearUsuarioUseCase,
    private readonly actualizarUsuario: ActualizarUsuarioUseCase,
    private readonly eliminarUsuario: EliminarUsuarioUseCase,
    private readonly cambiarPassword: CambiarPasswordUseCase,
  ) {}

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
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.actualizarUsuario.ejecutar(id, dto);
  }

  // PROTEGIDO: Requiere token JWT
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarUsuario.ejecutar(id);
  }
}
