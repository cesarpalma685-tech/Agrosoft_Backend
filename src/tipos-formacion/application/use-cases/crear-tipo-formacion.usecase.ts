import { Inject, Injectable } from '@nestjs/common';
import { TipoFormacion } from '../../domain/tipo-formacion.entity';
import { TipoFormacionRepository,TIPO_FORMACION_REPOSITORY,} from '../../domain/tipo-formacion.repository';

interface CrearInput {
  codigo: string;
  nombre: string;
  descripcion?: string;
  tipoEpaEnum?: string;
  orden?: number;
}

@Injectable()
export class CrearTipoFormacionUseCase {
  constructor(
    @Inject(TIPO_FORMACION_REPOSITORY) private readonly repo: TipoFormacionRepository,
  ) {}

  ejecutar(input: CrearInput): Promise<TipoFormacion> {
    const tipo = new TipoFormacion(
      null,
      input.codigo,
      input.nombre,
      input.descripcion,
      input.tipoEpaEnum,
      true,
      input.orden ?? 0,
    );
    return this.repo.crear(tipo);
  }
}
