import { Injectable } from '@nestjs/common';
import { ActividadHistorialRepositoryPort } from '../ports/actividad-historial.repository.port';
import { ActividadHistorial } from '../../domain/entities/actividad-historial.entity';

@Injectable()
export class ListarActividadesHistorialUseCase {
  constructor(
    private readonly actividadHistorialRepository: ActividadHistorialRepositoryPort,
  ) {}

  async execute(): Promise<ActividadHistorial[]> {
    return await this.actividadHistorialRepository.findAll();
  }
}
