import { Inject, Injectable } from '@nestjs/common';
import { CultivoHistorial } from '../domain/cultivo-historial.entity';
import type { CultivoHistorialRepository } from '../domain/cultivo-historial-repository.port';
import { CULTIVO_HISTORIAL_REPOSITORY } from '../domain/cultivo-historial-repository.port';

@Injectable()
export class ListCultivoHistorialUseCase {
  constructor(
    @Inject(CULTIVO_HISTORIAL_REPOSITORY)
    private readonly cultivoHistorialRepository: CultivoHistorialRepository,
  ) {}

  async execute(): Promise<CultivoHistorial[]> {
    return this.cultivoHistorialRepository.findAll();
  }
}