import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { promises as dnsPromises } from "dns";
import { EmailSenderPort } from "../../aplication/ports/email-sender.port";

/**
 * Envía los correos por SMTP. Variables de entorno: SMTP_HOST, SMTP_PORT,
 * SMTP_USER, SMTP_PASS y (opcional) SMTP_FROM.
 * Sin SMTP configurado (desarrollo) el enlace o código se imprime en la consola del servidor.
 */
@Injectable()
export class NodemailerEmailService implements EmailSenderPort {
  private readonly logger = new Logger(NodemailerEmailService.name);

  /** Devuelve false si no hay SMTP configurado (modo desarrollo). */
  private async enviar(mensaje: { to: string; subject: string; text: string; html: string }): Promise<boolean> {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;

    const port = parseInt(SMTP_PORT ?? "587");
    // Nodemailer resuelve el host con c-ares (dns.resolve4), que en algunas redes/VPN agota el
    // tiempo aunque el DNS del sistema funcione. Se resuelve con el DNS del sistema y se conecta a la IP.
    const { address } = await dnsPromises.lookup(SMTP_HOST, { family: 4 });
    const transporter = nodemailer.createTransport({
      host: address,
      tls: { servername: SMTP_HOST },
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({ from: SMTP_FROM || `AGROSOFT <${SMTP_USER}>`, ...mensaje });
    return true;
  }

  async enviarEnlaceRecuperacion(destinatario: string, enlace: string): Promise<void> {
    const enviado = await this.enviar({
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
    if (!enviado) this.logger.warn(`SMTP no configurado. Enlace de recuperación para ${destinatario}: ${enlace}`);
  }

  async enviarCodigoVerificacion(destinatario: string, codigo: string, minutosVigencia: number): Promise<void> {
    const enviado = await this.enviar({
      to: destinatario,
      subject: `${codigo} es tu código de verificación · AGROSOFT`,
      text: `Tu código para verificar tu correo en AGROSOFT es: ${codigo}\n\nVence en ${minutosVigencia} minutos. Si no creaste una cuenta, ignora este mensaje.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#0f172a">
          <h2 style="color:#15803d">AGROSOFT</h2>
          <p>Usa este código para verificar tu correo electrónico:</p>
          <p style="font-size:32px;font-weight:bold;letter-spacing:8px;background:#f0fdf4;border-radius:10px;padding:14px 0;text-align:center;color:#15803d">${codigo}</p>
          <p style="font-size:13px;color:#64748b">El código vence en ${minutosVigencia} minutos y es de un solo uso. Si no creaste una cuenta, ignora este mensaje.</p>
        </div>`,
    });
    if (!enviado) this.logger.warn(`SMTP no configurado. Código de verificación para ${destinatario}: ${codigo}`);
  }
}
