import { Inject, Injectable } from '@nestjs/common';
import { Cultivo } from '../domain/cultivo.entity';
import type { CultivoRepository } from '../domain/cultivo-repository.port';
import { CULTIVO_REPOSITORY } from '../domain/cultivo-repository.port';

@Injectable()
export class ListCultivoUseCase {
  constructor(
    @Inject(CULTIVO_REPOSITORY)
    private readonly cultivoRepository: CultivoRepository,
  ) {}

  async execute(): Promise<Cultivo[]> {
    return this.cultivoRepository.findAll();
  }
}