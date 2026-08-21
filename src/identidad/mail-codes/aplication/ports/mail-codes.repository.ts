import { EmailCode } from '../../domain/entities/mail-codes.entity';

export abstract class EmailCodeRepository {
  abstract crear(emailCode: EmailCode): Promise<EmailCode>;
  abstract actualizar(emailCode: EmailCode): Promise<EmailCode>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<EmailCode | null>;
}