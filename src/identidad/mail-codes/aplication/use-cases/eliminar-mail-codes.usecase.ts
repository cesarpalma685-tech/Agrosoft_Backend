import { Injectable, NotFoundException } from "@nestjs/common";

import { EmailCodeRepository } from "../ports/mail-codes.repository";

@Injectable()
export class EliminarEmailCodeUseCase {
  constructor(private readonly repository: EmailCodeRepository) {}

  async ejecutar(id: number): Promise<void> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException("EmailCode no encontrado");
    }

    await this.repository.eliminar(id);
  }
}
