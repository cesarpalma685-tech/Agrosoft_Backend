export class Rol {
  constructor(
    public readonly id: number | null,
    public nombre: string,
    public descripcion: string,
    public es_sistema: boolean,
    public estado: string,
  ) {}
}
