export class DatosUsoInvalidosException extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'DatosUsoInvalidosException';
  }
}