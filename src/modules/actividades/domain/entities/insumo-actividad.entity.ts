import { DatosInsumoActividadInvalidosException } from '../exceptions/insumo-actividad.exceptions';

export class InsumoActividad {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly insumoId: number,
    public cantidadUsada: number,
    public unidad: string,
    public costoUnitario: number,
    public costoTotal: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    insumoId: number;
    cantidadUsada: number;
    unidad: string;
    costoUnitario: number;
  }): InsumoActividad {
    if (props.cantidadUsada <= 0) {
      throw new DatosInsumoActividadInvalidosException(
        'La cantidad usada debe ser mayor a 0',
      );
    }
    if (props.costoUnitario < 0) {
      throw new DatosInsumoActividadInvalidosException(
        'El costo unitario no puede ser negativo',
      );
    }
    if (!props.unidad || props.unidad.trim().length === 0) {
      throw new DatosInsumoActividadInvalidosException(
        'La unidad de medida es obligatoria',
      );
    }

    const costoTotal = props.cantidadUsada * props.costoUnitario;

    return new InsumoActividad(
      0,
      props.actividadId,
      props.insumoId,
      props.cantidadUsada,
      props.unidad,
      props.costoUnitario,
      costoTotal,
    );
  }
}