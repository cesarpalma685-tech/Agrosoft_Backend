import { CantidadInvalidaException } from '../exceptions/reserva-insumo.exceptions';

export class ReservaInsumo {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly insumoId: number,
    public cantidadReservada: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    insumoId: number;
    cantidadReservada: number;
  }): ReservaInsumo {
    if (props.cantidadReservada <= 0) {
      throw new CantidadInvalidaException();
    }
    return new ReservaInsumo(
      0,
      props.actividadId,
      props.insumoId,
      props.cantidadReservada,
    );
  }

  actualizarCantidad(nuevaCantidad: number) {
    if (nuevaCantidad <= 0) throw new CantidadInvalidaException();
    this.cantidadReservada = nuevaCantidad;
    this.updatedAt = new Date();
  }
}