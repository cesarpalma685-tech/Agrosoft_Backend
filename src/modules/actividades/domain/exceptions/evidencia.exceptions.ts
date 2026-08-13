export class EvidenciaInvalidaException extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'EvidenciaInvalidaException';
  }
}