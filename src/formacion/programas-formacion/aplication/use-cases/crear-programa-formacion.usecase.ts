import { BadRequestException, Injectable } from "@nestjs/common";
import { ProgramaFormacion } from "../../domain/entities/programa-formacion.entity";
import { ProgramaFormacionRepository } from "../ports/programa-formacion.repository";
import {
  esProgramaFormacionNombre,
  ProgramaFormacionNombre,
} from "../../domain/enums/programa-formacion-nombre.enum";

export interface CrearProgramaFormacionInput {
  numeroFicha: string;
  nombre: ProgramaFormacionNombre;
  tipo?: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  estado?: string;
  cantidadAprendices?: number;
}

@Injectable()
export class CrearProgramaFormacionUseCase {
  constructor(private readonly repository: ProgramaFormacionRepository) {}

  async ejecutar(
    datos: CrearProgramaFormacionInput,
  ): Promise<ProgramaFormacion> {
    if (!esProgramaFormacionNombre(datos.nombre)) {
      throw new BadRequestException(
        `Programa de formación no permitido: ${datos.nombre}`,
      );
    }

    const programa = new ProgramaFormacion(
      null,
      datos.numeroFicha,
      datos.nombre,
      datos.tipo,
      datos.descripcion,
      datos.fechaInicio,
      datos.fechaFin,
      datos.estado ?? "activo",
      datos.cantidadAprendices ?? 0,
      new Date(),
    );

    return this.repository.crear(programa);
  }
}
