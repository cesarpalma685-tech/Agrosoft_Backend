export class CantidadInvalidaException extends Error {
  constructor(mensaje: string = 'La cantidad reservada debe ser mayor a 0') {
    super(mensaje);
    this.name = 'CantidadInvalidaException';
  }
}