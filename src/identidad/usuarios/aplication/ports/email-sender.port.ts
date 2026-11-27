export const EMAIL_SENDER_PORT = "EMAIL_SENDER_PORT";

export interface EmailSenderPort {
  enviarEnlaceRecuperacion(destinatario: string, enlace: string): Promise<void>;
  /** Envía el código de 6 caracteres con el que la persona confirma su correo. */
  enviarCodigoVerificacion(destinatario: string, codigo: string, minutosVigencia: number): Promise<void>;
}
