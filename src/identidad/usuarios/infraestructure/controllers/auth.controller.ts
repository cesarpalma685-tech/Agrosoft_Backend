import { Controller, Post, Body } from "@nestjs/common";
import { LoginUseCase } from "../../aplication/use-cases/login.usecase";
import { LoginDto } from "../../aplication/dto/login.dto";
import { CreateUsuarioDto } from '../../aplication/dto/create-usuario.dto';
import { CrearUsuarioUseCase } from '../../aplication/use-cases/crear-usuario.usecase';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: CrearUsuarioUseCase,
  ) {}

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  @Post("register")
  async register(@Body() dto: CreateUsuarioDto) {
    return this.registerUseCase.ejecutar(dto);
  }
}
