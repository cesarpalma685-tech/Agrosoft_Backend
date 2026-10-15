import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProgramaFormacionRepository } from "../ports/programa-formacion.repository";
import { ProgramaFormacion } from "../../domain/entities/programa-formacion.entity";
import {
  esProgramaFormacionNombre,
  ProgramaFormacionNombre,
} from "../../domain/enums/programa-formacion-nombre.enum";

export interface ActualizarProgramaFormacionInput {
  numeroFicha?: string;
  nombre?: ProgramaFormacionNombre;
  tipo?: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  estado?: string;
  cantidadAprendices?: number;
}

@Injectable()
export class ActualizarProgramaFormacionUseCase {
  constructor(private readonly repository: ProgramaFormacionRepository) {}

  async ejecutar(
    id: number,
    datos: ActualizarProgramaFormacionInput,
  ): Promise<ProgramaFormacion> {
    if (datos.nombre !== undefined && !esProgramaFormacionNombre(datos.nombre)) {
      throw new BadRequestException(
        `Programa de formación no permitido: ${datos.nombre}`,
      );
    }

    const programa = await this.repository.buscarPorId(id);

    if (!programa) {
      throw new NotFoundException("Programa de formación no encontrado");
    }

    const actualizado = new ProgramaFormacion(
      programa.id,
      datos.numeroFicha ?? programa.numeroFicha,
      datos.nombre ?? programa.nombre,
      datos.tipo ?? programa.tipo,
      datos.descripcion ?? programa.descripcion,
      datos.fechaInicio ?? programa.fechaInicio,
      datos.fechaFin ?? programa.fechaFin,
      datos.estado ?? programa.estado,
      datos.cantidadAprendices ?? programa.cantidadAprendices,
      programa.createdAt,
    );

    return this.repository.actualizar(actualizado);
  }
}
