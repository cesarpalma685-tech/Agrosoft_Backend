import { Inject, Injectable } from '@nestjs/common';
import { Epa } from '../domain/epa.entity';
import type { EpaRepository } from '../domain/epa-repository.port';
import { EPA_REPOSITORY } from '../domain/epa-repository.port';

@Injectable()
export class CreateEpaUseCase {
  constructor(
    @Inject(EPA_REPOSITORY)
    private readonly epaRepository: EpaRepository,
  ) {}

  async execute(input: {
    nombre: string;
    tipoEpa: string;
    descripcion?: string;
    sintomas?: string;
    manejoYControl?: string;
    mesesProbables?: number[];
    temporadas?: string[];
    notasEstacionalidad?: string;
    fotosSintomas?: string[];
    fotosGenerales?: string[];
    tags?: string[];
    creadoPorUsuarioId?: number;
  }): Promise<Epa> {
    const epa = Epa.create(input);
    return this.epaRepository.save(epa);
  }
}