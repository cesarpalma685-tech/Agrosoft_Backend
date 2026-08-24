import { Injectable } from '@nestjs/common';
import { Sublote } from '../../domain/entities/sublote.dto';
import { SubloteRepositoryPort } from '../ports/sublote.repository.port';

@Injectable()
export class ListarSublotesUseCase {
  constructor(
    private readonly subloteRepository: SubloteRepositoryPort,
  ) {}

  async execute(): Promise<Sublote[]> {
    return await this.subloteRepository.findAll();
  }
}