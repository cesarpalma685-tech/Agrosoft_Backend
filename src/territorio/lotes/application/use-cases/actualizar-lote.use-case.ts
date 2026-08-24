
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoteRepositoryPort } from '../ports/lote.repository.port';
import { LoteDto } from '../../domain/entities/lote.dto';

@Injectable()
export class ActualizarLoteUseCase {
  constructor(
    private readonly loteRepository: LoteRepositoryPort,
  ) {}

  async execute(
    id: number,dto: Partial<LoteDto>,): Promise<LoteDto> {
    // Verificar que el lote exista
    const existe = await this.loteRepository.findById(id);

    if (!existe) {
      throw new NotFoundException(
        `El lote con ID ${id} no existe para actualizar`,
      );
    }

    // Actualizar el lote
    const loteActualizado = await this.loteRepository.update(id, dto);

    if (!loteActualizado) {
      throw new NotFoundException(
        `No se pudo actualizar el lote con ID ${id}`,
      );
    }

    return loteActualizado;
  }
}

