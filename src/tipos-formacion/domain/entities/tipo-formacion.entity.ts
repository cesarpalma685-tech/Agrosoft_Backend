export class TipoFormacion {
  constructor(
    public readonly id: number | null,
    public codigo: string,
    public nombre: string,
    public descripcion?: string,
    public tipoEpaEnum?: string,
    public activo: boolean = true,
    public orden: number = 0,
    public readonly createdAt?: Date,
  ) {}
}
