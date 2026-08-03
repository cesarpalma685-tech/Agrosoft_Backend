import { Inject, Injectable } from '@nestjs/common';
import { CultivoHistorial } from '../domain/cultivo-historial.entity';
import type { CultivoHistorialRepository } from '../domain/cultivo-historial-repository.port';
import { CULTIVO_HISTORIAL_REPOSITORY } from '../domain/cultivo-historial-repository.port';

@Injectable()
export class CreateCultivoHistorialUseCase {
  constructor(
    @Inject(CULTIVO_HISTORIAL_REPOSITORY)
    private readonly cultivoHistorialRepository: CultivoHistorialRepository,
  ) {}

  async execute(input: {
    cultivoId: number;
    usuarioId?: number;
    motivo?: string;
    cambios?: Record<string, unknown>;
  }): Promise<CultivoHistorial> {
    const cultivoHistorial = CultivoHistorial.create(input);
    return this.cultivoHistorialRepository.save(cultivoHistorial);
  }
}