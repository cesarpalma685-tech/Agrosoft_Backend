import { Inject, Injectable } from '@nestjs/common';
import { Epa } from '../domain/epa.entity';
import type { EpaRepository } from '../domain/epa-repository.port';
import { EPA_REPOSITORY } from '../domain/epa-repository.port';

@Injectable()
export class ListEpaUseCase {
  constructor(
    @Inject(EPA_REPOSITORY)
    private readonly epaRepository: EpaRepository,
  ) {}

  async execute(): Promise<Epa[]> {
    return this.epaRepository.findAll();
  }
}