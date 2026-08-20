import { DatosUsoInsumoInvalidosException } from '../exceptions/uso-insumo.exceptions';

export class UsoInsumo {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly insumoId: number,
    public cantidadUso: number,
    public costoUnitarioUso: number,
    public costoTotal: number,
    public readonly movimientoInsumoId: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    insumoId: number;
    cantidadUso: number;
    costoUnitarioUso: number;
    movimientoInsumoId: number;
  }): UsoInsumo {
    if (props.cantidadUso <= 0) {
      throw new DatosUsoInsumoInvalidosException(
        'La cantidad usada debe ser mayor a 0',
      );
    }
    if (props.costoUnitarioUso < 0) {
      throw new DatosUsoInsumoInvalidosException(
        'El costo unitario no puede ser negativo',
      );
    }

    const costoTotal = props.cantidadUso * props.costoUnitarioUso;

    return new UsoInsumo(
      0,
      props.actividadId,
      props.insumoId,
      props.cantidadUso,
      props.costoUnitarioUso,
      costoTotal,
      props.movimientoInsumoId,
    );
  }
}