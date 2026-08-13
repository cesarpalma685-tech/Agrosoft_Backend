import { DatosUsoInvalidosException } from '../exceptions/uso-herramienta.exceptions';
export class UsoHerramienta {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly insumoId: number,
    public horasUsadas: number,
    public depreciacionGenerada: number,
    public valorEnLibrosAntes: number,
    public valorEnLibrosDespues: number,
    public readonly fechaUso: Date,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    insumoId: number;
    horasUsadas: number;
    valorEnLibrosAntes: number;
    tasaDepreciacionPorHora: number;
    fechaUso?: Date;
  }): UsoHerramienta {
    if (props.horasUsadas <= 0) {
      throw new DatosUsoInvalidosException('Las horas usadas deben ser mayores a 0');
    }
    if (props.valorEnLibrosAntes < 0) {
      throw new DatosUsoInvalidosException('El valor en libros no puede ser negativo');
    }

    const depreciacionGenerada = props.horasUsadas * props.tasaDepreciacionPorHora;
    const valorEnLibrosDespues = Math.max(
      0,
      props.valorEnLibrosAntes - depreciacionGenerada,
    );

    return new UsoHerramienta(
      0,
      props.actividadId,
      props.insumoId,
      props.horasUsadas,
      depreciacionGenerada,
      props.valorEnLibrosAntes,
      valorEnLibrosDespues,
      props.fechaUso ?? new Date(),
    );
  }
}