import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EmailCode } from '../../domain/mail-codes.entity';
import { EmailCodeRepository } from '../../domain/mail-codes.repository';

export interface ActualizarEmailCodeInput {
usuarioId?: number;
tipo?: string;
code?: string;
expiresAt?: Date;
usedAt?: Date;
}

@Injectable()
export class ActualizarEmailCodeUseCase {
constructor(
    private readonly repository: EmailCodeRepository,
) {}

async ejecutar(
    id: number,
    datos: ActualizarEmailCodeInput,
): Promise<EmailCode> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
    throw new NotFoundException(
        'EmailCode no encontrado',
    );
    }

    const emailCode = new EmailCode(
      existente.id,
      datos.usuarioId ?? existente.usuarioId,
      datos.tipo ?? existente.tipo,
      datos.code ?? existente.code,
      datos.expiresAt ?? existente.expiresAt,
      datos.usedAt ?? existente.usedAt,
      existente.createdAt,
    );

    return this.repository.actualizar(emailCode);
  }
}