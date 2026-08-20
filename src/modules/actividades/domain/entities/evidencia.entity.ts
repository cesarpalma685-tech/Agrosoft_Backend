import { EvidenciaInvalidaException } from '../exceptions/evidencia.exceptions';

export class Evidencia {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public descripcion: string,
    public imagenes: string[],
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    descripcion: string;
    imagenes?: string[];
  }): Evidencia {
    if (!props.descripcion || props.descripcion.trim().length === 0) {
      throw new EvidenciaInvalidaException(
        'La descripción de la evidencia es obligatoria',
      );
    }

    return new Evidencia(
      0,
      props.actividadId,
      props.descripcion,
      props.imagenes ?? [],
    );
  }
}