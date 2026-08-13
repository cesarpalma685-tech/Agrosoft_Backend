import { HorasInvalidasException } from '../exceptions/servicio.exceptions';

export class Servicio {
  constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly maquinariaId: number,
    public nombreServicio: string,
    public horas: number,
    public precioHora: number,
    public costo: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
  ) {}

  static crear(props: {
    actividadId: number;
    maquinariaId: number;
    nombreServicio: string;
    horas: number;
    precioHora: number;
  }): Servicio {
    if (props.horas <= 0) {
      throw new HorasInvalidasException();
    }
    const costo = props.horas * props.precioHora;
    return new Servicio(
      0,
      props.actividadId,
      props.maquinariaId,
      props.nombreServicio,
      props.horas,
      props.precioHora,
      costo,
    );
  }

  actualizarHoras(nuevasHoras: number) {
    if (nuevasHoras <= 0) throw new HorasInvalidasException();
    this.horas = nuevasHoras;
    this.costo = this.horas * this.precioHora;
    this.updatedAt = new Date();
  }
}