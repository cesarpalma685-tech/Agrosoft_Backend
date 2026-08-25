import { Injectable } from '@nestjs/common';
import { ActividadServicioRepositoryPort } from '../ports/actividad-servicio.repository.port';
import { ActividadServicio } from '../../domain/entities/actividad-servicio.entity';
import { CrearActividadServicioDto } from '../dto/actividad_servicio.dto';

@Injectable()
export class CrearActividadServicioUseCase {
  constructor(
    private readonly actividadServicioRepository: ActividadServicioRepositoryPort,
  ) {}

  async execute(dto: CrearActividadServicioDto): Promise<ActividadServicio> {
    const nuevoServicio = new ActividadServicio();
    Object.assign(nuevoServicio, dto);
    nuevoServicio.costo = dto.horas * dto.precioHora;
    return await this.actividadServicioRepository.save(nuevoServicio);
  }
}
