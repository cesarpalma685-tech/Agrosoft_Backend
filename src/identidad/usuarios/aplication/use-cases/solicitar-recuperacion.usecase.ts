import { Inject, Injectable, Logger } from "@nestjs/common";
import * as crypto from "crypto";
import { EmailCodeRepository } from "../../../mail-codes/aplication/ports/mail-codes.repository";
import { EmailCode } from "../../../mail-codes/domain/entities/mail-codes.entity";
import { USUARIO_REPOSITORY, UsuarioRepository } from "../ports/usuario.repository";
import { EMAIL_SENDER_PORT, EmailSenderPort } from "../ports/email-sender.port";

export const TIPO_RECUPERACION = "recuperacion_password";
export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

const MENSAJE = "Si el correo está registrado, recibirás un enlace de recuperación.";

@Injectable()
export class SolicitarRecuperacionUseCase {
  private readonly logger = new Logger(SolicitarRecuperacionUseCase.name);

  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepo: UsuarioRepository,
    private readonly mailCodeRepo: EmailCodeRepository,
    @Inject(EMAIL_SENDER_PORT)
    private readonly emailSender: EmailSenderPort,
  ) {}

  async ejecutar(correo: string): Promise<{ mensaje: string }> {
    const usuario = await this.usuarioRepo.buscarPorCorreo(correo);

    // Misma respuesta exista o no el correo, para no revelar qué cuentas existen
    if (!usuario || usuario.id === null) return { mensaje: MENSAJE };

    const token = crypto.randomBytes(32).toString("hex");
    const expiraEn = new Date(Date.now() + 30 * 60 * 1000);

    // En BD solo se guarda el hash: quien lea la tabla no puede usar el enlace
    await this.mailCodeRepo.crear(
      new EmailCode(null, usuario.id, TIPO_RECUPERACION, hashToken(token), expiraEn),
    );

    const urlFrontend = process.env.FRONTEND_URL || "http://localhost:5173";
    const enlace = `${urlFrontend}/restablecer-password?token=${token}`;

    try {
      await this.emailSender.enviarEnlaceRecuperacion(usuario.correo, enlace);
    } catch (error) {
      // No se propaga: un error distinto revelaría que el correo existe
      this.logger.error(`No se pudo enviar el correo a ${usuario.correo}`, error as Error);
    }

    return { mensaje: MENSAJE };
  }
}
