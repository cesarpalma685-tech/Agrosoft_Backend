import { Injectable } from '@nestjs/common';
import { LoteRepositoryPort } from '../ports/lote.repository.port';
import { CrearLoteDto } from '../dto/crear-lote.dto';
import { LoteDto } from '../../domain/entities/lote.dto';

@Injectable()
export class CrearLoteUseCase {
  constructor(
    private readonly loteRepository: LoteRepositoryPort,
  ) {}

  async execute(dto: CrearLoteDto): Promise<LoteDto> {
    const nuevoLote = Object.assign(new LoteDto(), dto);

    return await this.loteRepository.save(nuevoLote);
  }
}