import { HorasInvalidasException } from '../exceptions/responsable.exceptions';

export class Responsable {
constructor(
    public readonly id: number,
    public readonly actividadId: number,
    public readonly usuarioId: number,
    public horas: number,
    public precioHora: number,
    public costo: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date | null,
) {}

static crear(props: {
    actividadId: number;
    usuarioId: number;
    horas: number;
    precioHora: number;
}): Responsable {
    if (props.horas <= 0) {
    throw new HorasInvalidasException();
    }
    const costo = props.horas * props.precioHora;
    return new Responsable(
    0,
    props.actividadId,
    props.usuarioId,
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