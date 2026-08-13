export class DatosUsoInsumoInvalidosException extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'DatosUsoInsumoInvalidosException';
  }
}