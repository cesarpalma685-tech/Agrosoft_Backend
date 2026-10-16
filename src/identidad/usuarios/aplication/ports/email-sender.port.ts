export const EMAIL_SENDER_PORT = "EMAIL_SENDER_PORT";

export interface EmailSenderPort {
  enviarEnlaceRecuperacion(destinatario: string, enlace: string): Promise<void>;
}
