import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";
import {
  AUTH_SERVICE_PORT,
  IAuthServicePort,
} from "../ports/auth-service.port";
import { RolRepository } from "../../../roles/aplication/ports/rol.repository";
import { ROL_NOMBRE_LABELS } from "../../../roles/domain/enums/rol-nombre.enum";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    @Inject(AUTH_SERVICE_PORT)
    private readonly authService: IAuthServicePort,
    private readonly rolRepository: RolRepository,
  ) {}

  async execute(correo: string, pass: string) {
    // 1. Buscamos por la propiedad correcta: buscarPorCorreo
    const usuario = await this.usuarioRepository.buscarPorCorreo(correo);

    if (!usuario) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    const passwordValida = await bcrypt.compare(pass, usuario.passwordHash);
    if (!passwordValida) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    // 2. Pasamos correo y convertimos id a string
    const token = this.authService.generateToken({
      id: String(usuario.id),
      email: usuario.correo,
    });

    const rol = usuario.rolId
      ? await this.rolRepository.buscarPorId(usuario.rolId)
      : null;

    // Datos públicos para mostrar en el frontend (nunca el passwordHash).
    // La foto va aquí y no en el JWT para no inflar el token.
    return {
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        identificacion: usuario.identificacion,
        estado: usuario.estado,
        rol: rol?.nombre ?? null,
        rolLabel: rol ? ROL_NOMBRE_LABELS[rol.nombre] : null,
        fotoPerfil: usuario.fotoPerfil,
        passwordActualizadoAt: usuario.passwordActualizadoAt,
      },
    };
  }
}
