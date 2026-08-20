export class DatosInsumoActividadInvalidosException extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'DatosInsumoActividadInvalidosException';
  }
}