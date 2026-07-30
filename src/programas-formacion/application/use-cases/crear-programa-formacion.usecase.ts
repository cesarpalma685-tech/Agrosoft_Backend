import { Injectable } from '@nestjs/common';
import { ProgramaFormacion } from '../../domain/programa-formacion.entity';
import { ProgramaFormacionRepository } from '../../domain/programa-formacion.repository';

export interface CrearProgramaFormacionInput {
  numeroFicha: string;
  nombre: string;
  tipo?: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  estado?: string;
  cantidadAprendices?: number;
}

@Injectable()
export class CrearProgramaFormacionUseCase {
  constructor(
    private readonly repository: ProgramaFormacionRepository,
  ) {}

  async ejecutar(
    datos: CrearProgramaFormacionInput,
  ): Promise<ProgramaFormacion> {
    const programa = new ProgramaFormacion(
      null,
      datos.numeroFicha,
      datos.nombre,
      datos.tipo,
      datos.descripcion,
      datos.fechaInicio,
      datos.fechaFin,
      datos.estado ?? 'activo',
      datos.cantidadAprendices ?? 0,
      new Date(),
    );

    return this.repository.crear(programa);
  }
}