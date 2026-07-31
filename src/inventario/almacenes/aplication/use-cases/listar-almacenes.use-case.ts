import { Injectable } from '@nestjs/common';
import { AlmacenRepositoryPort } from '../ports/almacen.repository.port';
import { Almacen } from '../../domain/entities/crear-almacen.dto';

@Injectable()
export class ObtenerAlmacenesUseCase {
  constructor(
    private readonly almacenRepository: AlmacenRepositoryPort,
  ) {}

  async execute(): Promise<Almacen[]> {
    return await this.almacenRepository.findAll();
  }
}