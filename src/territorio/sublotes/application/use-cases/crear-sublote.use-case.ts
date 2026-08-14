import { Injectable } from '@nestjs/common';
import { SubloteRepositoryPort } from '../ports/sublote.repository.port';
import { CrearSubloteDto } from '../dto/crear-sublote.dto';
import { Sublote } from '../../domain/entities/sublote.dto';

@Injectable()
export class CrearSubloteUseCase {
  constructor(
    private readonly subloteRepository: SubloteRepositoryPort,
  ) {}

  async execute(dto: CrearSubloteDto): Promise<Sublote> {
    const nuevoSublote = new Sublote();

    Object.assign(nuevoSublote, dto);

    return await this.subloteRepository.save(nuevoSublote);
  }
}