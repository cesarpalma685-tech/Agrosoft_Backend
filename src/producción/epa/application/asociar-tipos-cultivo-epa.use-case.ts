// application/asociar-tipos-cultivo-epa.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import type { EpaRepository } from '../domain/epa-repository.port';
import { EPA_REPOSITORY } from '../domain/epa-repository.port';

@Injectable()
export class AsociarTiposCultivoEpaUseCase {
  constructor(
    @Inject(EPA_REPOSITORY)
    private readonly epaRepository: EpaRepository,
  ) {}

  async execute(epaId: number, tipoCultivoWikiIds: number[]): Promise<void> {
    await this.epaRepository.asociarTiposCultivo(epaId, tipoCultivoWikiIds);
  }
}