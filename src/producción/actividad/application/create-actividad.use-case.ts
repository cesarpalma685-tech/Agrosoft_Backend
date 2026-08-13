import { Inject, Injectable } from '@nestjs/common';
import { Actividad } from '../domain/actividad.entity';
import type { ActividadRepository } from '../domain/actividad-repository.port';
import { ACTIVIDAD_REPOSITORY } from '../domain/actividad-repository.port';

@Injectable()
export class CreateActividadUseCase {
  constructor(
    @Inject(ACTIVIDAD_REPOSITORY)
    private readonly actividadRepository: ActividadRepository,
  ) {}

  async execute(input: {
    nombre: string;
    tipo: string;
    subtipo?: string;
    loteId: number;
    subLoteId?: number;
    cultivoId: number;
    fecha: string;
    horasActividad?: number;
    precioHoraActividad?: number;
    costoManoObra?: number;
    descripcion?: string;
    estado?: string;
    creadoPorUsuarioId?: number;
    cantidadPlantas?: number;
    kgRecolectados?: number;
    productoAgroId?: number;
  }): Promise<Actividad> {
    const actividad = Actividad.create(input);
    return this.actividadRepository.save(actividad);
  }
}