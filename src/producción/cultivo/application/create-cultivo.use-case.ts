import { Inject, Injectable } from '@nestjs/common';
import { Cultivo } from '../domain/cultivo.entity';
import type { CultivoRepository } from '../domain/cultivo-repository.port';
import { CULTIVO_REPOSITORY } from '../domain/cultivo-repository.port';

@Injectable()
export class CreateCultivoUseCase {
  constructor(
    @Inject(CULTIVO_REPOSITORY)
    private readonly cultivoRepository: CultivoRepository,
  ) {}

  async execute(input: {
    nombreCultivo: string;
    tipoCultivo: string;
    descripcion?: string;
    loteId: number;
    subloteId?: number;
    imgCultivo?: string;
    fechaSiembra: string;
    fechaFinalizacion?: string;
    costoTotal?: number;
    estado?: string;
  }): Promise<Cultivo> {
    const cultivo = Cultivo.create(input);
    return this.cultivoRepository.save(cultivo);
  }
}