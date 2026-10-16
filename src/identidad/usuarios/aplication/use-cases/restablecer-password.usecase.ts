import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { EmailCodeRepository } from "../../../mail-codes/aplication/ports/mail-codes.repository";
import { USUARIO_REPOSITORY, UsuarioRepository } from "../ports/usuario.repository";
import { TIPO_RECUPERACION, hashToken } from "./solicitar-recuperacion.usecase";

@Injectable()
export class RestablecerPasswordUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepo: UsuarioRepository,
    private readonly mailCodeRepo: EmailCodeRepository,
  ) {}

  async ejecutar(token: string, passwordNueva: string): Promise<{ mensaje: string }> {
    const registro = await this.mailCodeRepo.buscarPorCodigo(hashToken(token));
    const invalido =
      !registro ||
      registro.tipo !== TIPO_RECUPERACION ||
      registro.usedAt ||
      registro.expiresAt.getTime() < Date.now();
    if (invalido) {
      throw new BadRequestException(["El enlace no es válido o ya venció. Solicita uno nuevo."]);
    }

    const usuario = await this.usuarioRepo.buscarPorId(registro.usuarioId);
    if (!usuario) {
      throw new BadRequestException(["El enlace no es válido o ya venció. Solicita uno nuevo."]);
    }

    usuario.passwordHash = await bcrypt.hash(passwordNueva, 10);
    usuario.passwordActualizadoAt = new Date();
    await this.usuarioRepo.actualizar(usuario);

    registro.usedAt = new Date();
    await this.mailCodeRepo.actualizar(registro);

    return { mensaje: "Contraseña restablecida correctamente" };
  }
}
