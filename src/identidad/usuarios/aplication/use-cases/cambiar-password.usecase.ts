import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from "../ports/usuario.repository";

@Injectable()
export class CambiarPasswordUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly repository: UsuarioRepository,
  ) {}

  async ejecutar(id: number, passwordActual: string, passwordNueva: string) {
    const usuario = await this.repository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }

    const passwordValida = await bcrypt.compare(passwordActual, usuario.passwordHash);
    if (!passwordValida) {
      throw new BadRequestException(["La contraseña actual es incorrecta"]);
    }
    if (await bcrypt.compare(passwordNueva, usuario.passwordHash)) {
      throw new BadRequestException(["La nueva contraseña debe ser diferente a la actual"]);
    }

    usuario.passwordHash = await bcrypt.hash(passwordNueva, 10);
    usuario.passwordActualizadoAt = new Date();
    await this.repository.actualizar(usuario);

    return {
      mensaje: "Contraseña actualizada correctamente",
      passwordActualizadoAt: usuario.passwordActualizadoAt,
    };
  }
}
