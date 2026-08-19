export class Permiso {
  constructor(
    public readonly id: number | null,
    public modulo: string,
    public accion: string,
    public clave: string,
    public readonly createdAt?: Date,
  ) {}
}