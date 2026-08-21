import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TipoFormacionRepository,TIPO_FORMACION_REPOSITORY, } from '../ports/tipo-formacion.repository';

@Injectable()
export class EliminarTipoFormacionUseCase {
  constructor(
    @Inject(TIPO_FORMACION_REPOSITORY) private readonly repo: TipoFormacionRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const tipo = await this.repo.buscarPorId(id);
    if (!tipo) throw new NotFoundException(`Tipo de formación ${id} no encontrado`);
    await this.repo.eliminar(id);
  }
}
