import { Injectable } from '@nestjs/common';
import { UsoHerramientaRepositoryPort } from '../ports/uso-herramienta.repository.port';
import { UsoHerramienta } from '../../domain/entities/uso-herramienta.entity';

@Injectable()
export class ListarUsosHerramientasPorActividadUseCase {
  constructor(
    private readonly usoHerramientaRepository: UsoHerramientaRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<UsoHerramienta[]> {
    return await this.usoHerramientaRepository.findByActividadId(actividadId);
  }
}
