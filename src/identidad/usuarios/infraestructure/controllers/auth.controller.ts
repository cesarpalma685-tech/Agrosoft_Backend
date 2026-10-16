import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { SolicitarRecuperacionUseCase } from "../../aplication/use-cases/solicitar-recuperacion.usecase";
import { RestablecerPasswordUseCase } from "../../aplication/use-cases/restablecer-password.usecase";
import { RestablecerPasswordDto, SolicitarRecuperacionDto } from "../../aplication/dto/recuperar-password.dto";
import { LoginUseCase } from "../../aplication/use-cases/login.usecase";
import { LoginDto } from "../../aplication/dto/login.dto";
import { CreateUsuarioDto } from '../../aplication/dto/create-usuario.dto';
import { CrearUsuarioUseCase } from '../../aplication/use-cases/crear-usuario.usecase';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: CrearUsuarioUseCase,
    private readonly solicitarRecuperacionUseCase: SolicitarRecuperacionUseCase,
    private readonly restablecerPasswordUseCase: RestablecerPasswordUseCase,
  ) {}

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post("forgot-password")
  @HttpCode(200)
  async forgotPassword(@Body() dto: SolicitarRecuperacionDto) {
    return this.solicitarRecuperacionUseCase.ejecutar(dto.email);
  }

  @Post("reset-password")
  @HttpCode(200)
  async resetPassword(@Body() dto: RestablecerPasswordDto) {
    return this.restablecerPasswordUseCase.ejecutar(dto.token, dto.passwordNueva);
  }

  @Post("register")
  async register(@Body() dto: CreateUsuarioDto) {
    return this.registerUseCase.ejecutar(dto);
  }
}
