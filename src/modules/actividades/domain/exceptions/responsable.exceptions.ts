export class HorasInvalidasException extends Error {
  constructor(mensaje: string = 'Las horas asignadas deben ser mayores a 0') {
    super(mensaje);
    this.name = 'HorasInvalidasException';
  }
}