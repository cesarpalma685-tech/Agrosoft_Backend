import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TipoFormacion } from '../../domain/entities/tipo-formacion.entity';
import { TipoFormacionRepository, TIPO_FORMACION_REPOSITORY } from '../ports/tipo-formacion.repository';


interface ActualizarInput {
  nombre?: string;
  descripcion?: string;
  activo?: boolean;
  orden?: number;
}

@Injectable()
export class ActualizarTipoFormacionUseCase {
  constructor(
    @Inject(TIPO_FORMACION_REPOSITORY) private readonly repo: TipoFormacionRepository,
  ) {}

  async ejecutar(id: number, input: ActualizarInput): Promise<TipoFormacion> {
    const tipo = await this.repo.buscarPorId(id);
    if (!tipo) throw new NotFoundException(`Tipo de formación ${id} no encontrado`);
    Object.assign(tipo, input);
    return this.repo.actualizar(tipo);
  }
}
