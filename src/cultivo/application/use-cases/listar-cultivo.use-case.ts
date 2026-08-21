import { Injectable } from '@nestjs/common';
import { CultivoRepositoryPort } from '../ports/cultivo.repository.port';
import { Cultivo } from '../../domain/entities/cultivo.entity';

@Injectable()
export class ListarCultivoUseCase {
  constructor(private readonly cultivoRepository: CultivoRepositoryPort) {}

  async execute(): Promise<Cultivo[]> {
    return await this.cultivoRepository.findAll();
  }
}