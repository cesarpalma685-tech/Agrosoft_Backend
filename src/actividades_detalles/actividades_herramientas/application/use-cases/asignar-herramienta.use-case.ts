import { Injectable } from '@nestjs/common';
import { ActividadHerramientaRepositoryPort } from '../ports/actividad-herramienta.repository.port';
import { ActividadHerramienta } from '../../domain/entities/actividad-herramienta.entity';
import { AsignarActividadHerramientaDto } from '../dto/actividad_herramienta.dto';

@Injectable()
export class AsignarHerramientaUseCase {
  constructor(
    private readonly actividadHerramientaRepository: ActividadHerramientaRepositoryPort,
  ) {}

  async execute(dto: AsignarActividadHerramientaDto): Promise<ActividadHerramienta> {
    const nuevaHerramienta = new ActividadHerramienta();
    Object.assign(nuevaHerramienta, dto);
    return await this.actividadHerramientaRepository.save(nuevaHerramienta);
  }
}
