import { Injectable, NotFoundException } from '@nestjs/common';
import { LoteRepositoryPort } from '../ports/lote.repository.port';
import { LoteDto } from '../../domain/entities/lote.dto';

@Injectable()
export class ObtenerLotePorIdUseCase {
  constructor(
    private readonly loteRepository: LoteRepositoryPort,
  ) {}

  async execute(id: number): Promise<LoteDto> {
    const lote = await this.loteRepository.findById(id);

    if (!lote) {
      throw new NotFoundException(
        `El lote con ID ${id} no existe`,
      );
    }

    return lote;
  }
}