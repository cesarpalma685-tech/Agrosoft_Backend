export class Cliente {
  constructor(
    public readonly id: number | null,
    public nombre: string,
    public identificacion?: string,
    public telefono?: string,
    public email?: string,
    public direccion?: string,
    public notas?: string,
    public readonly createdAt?: Date,
  ) {}
}
