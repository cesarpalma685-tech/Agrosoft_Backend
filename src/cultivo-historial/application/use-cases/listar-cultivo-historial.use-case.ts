import { Injectable } from '@nestjs/common';
import { CultivoHistorialRepositoryPort } from '../ports/cultivo-historial.repository.port';
import { CultivoHistorial } from '../../domain/entities/cultivo-historial.entity';

@Injectable()
export class ListarCultivoHistorialUseCase {
  constructor(private readonly cultivoHistorialRepository: CultivoHistorialRepositoryPort) {}

  async execute(): Promise<CultivoHistorial[]> {
    return await this.cultivoHistorialRepository.findAll();
  }
}