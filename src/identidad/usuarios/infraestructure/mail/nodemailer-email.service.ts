import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { EmailSenderPort } from "../../aplication/ports/email-sender.port";

/**
 * Envía los correos por SMTP. Variables de entorno: SMTP_HOST, SMTP_PORT,
 * SMTP_USER, SMTP_PASS y (opcional) SMTP_FROM.
 * Sin SMTP configurado (desarrollo) el enlace se imprime en la consola del servidor.
 */
@Injectable()
export class NodemailerEmailService implements EmailSenderPort {
  private readonly logger = new Logger(NodemailerEmailService.name);

  async enviarEnlaceRecuperacion(destinatario: string, enlace: string): Promise<void> {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      this.logger.warn(
        `SMTP no configurado. Enlace de recuperación para ${destinatario}: ${enlace}`,
      );
      return;
    }

    const port = parseInt(SMTP_PORT ?? "587");
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: SMTP_FROM || `AGROSOFT <${SMTP_USER}>`,
      to: destinatario,
      subject: "Recupera tu contraseña · AGROSOFT",
      text: `Recibimos una solicitud para restablecer tu contraseña.\n\nAbre este enlace (vence en 30 minutos):\n${enlace}\n\nSi no fuiste tú, ignora este mensaje.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#0f172a">
          <h2 style="color:#15803d">AGROSOFT</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>
            <a href="${enlace}" style="display:inline-block;background:#15803d;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold">
              Restablecer contraseña
            </a>
          </p>
          <p style="font-size:13px;color:#64748b">El enlace vence en 30 minutos. Si no fuiste tú, ignora este mensaje.</p>
        </div>`,
    });
  }
}
