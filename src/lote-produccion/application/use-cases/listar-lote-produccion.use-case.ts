import { Injectable } from '@nestjs/common';
import { LoteProduccionRepositoryPort } from '../ports/lote-produccion.repository.port';
import { LoteProduccion } from '../../domain/entities/lote-produccion.entity';

@Injectable()
export class ListarLoteProduccionUseCase {
  constructor(private readonly loteProduccionRepository: LoteProduccionRepositoryPort) {}

  async execute(): Promise<LoteProduccion[]> {
    return await this.loteProduccionRepository.findAll();
  }
}