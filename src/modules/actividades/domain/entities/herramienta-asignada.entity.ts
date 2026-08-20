import { HorasInvalidasException } from '../exceptions/herramienta-asignada.exceptions';

export class HerramientaAsignada {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly activoFijoId: number,
    public horasEstimadas: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    activoFijoId: number;
    horasEstimadas: number;
  }): HerramientaAsignada {
    if (props.horasEstimadas <= 0) {
      throw new HorasInvalidasException();
    }
    return new HerramientaAsignada(
      0,
      props.actividadId,
      props.activoFijoId,
      props.horasEstimadas,
    );
  }

  actualizarHorasEstimadas(nuevasHoras: number) {
    if (nuevasHoras <= 0) throw new HorasInvalidasException();
    this.horasEstimadas = nuevasHoras;
    this.updatedAt = new Date();
  }
}