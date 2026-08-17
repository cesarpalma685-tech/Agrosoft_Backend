import { Injectable } from '@nestjs/common';
import { ActividadRepositoryPort } from '../ports/actividad.repository.port';
import { CrearActividadDto } from '../dto/crear-actividad.dto';
import { Actividad } from '../../domain/entities/actividad.entity';

@Injectable()
export class CrearActividadUseCase {
  constructor(private readonly actividadRepository: ActividadRepositoryPort) {}

  async execute(dto: CrearActividadDto): Promise<Actividad> {
    const nueva = new Actividad();
    Object.assign(nueva, dto);
    nueva.estado = dto.estado ?? 'pendiente';
    return await this.actividadRepository.save(nueva);
  }
}