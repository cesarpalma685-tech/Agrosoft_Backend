import { Injectable } from '@nestjs/common';
import { EmailCode } from '../../domain/mail-codes.entity';
import { EmailCodeRepository } from '../../domain/mail-codes.repository';

export interface CrearEmailCodeInput {
usuarioId: number;
tipo: string;
code: string;
expiresAt: Date;
}

@Injectable()
export class CrearEmailCodeUseCase {
constructor(
    private readonly repository: EmailCodeRepository,
) {}

async ejecutar(
    datos: CrearEmailCodeInput,): Promise<EmailCode> {
    const emailCode = new EmailCode(
      null,
      datos.usuarioId,
      datos.tipo,
      datos.code,
      datos.expiresAt,
      undefined,
      new Date(),
    );

    return this.repository.crear(emailCode);
  }
}