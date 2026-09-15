export class RolPermiso {
  constructor(
    public readonly id: number | null,
    public rolId: number,
    public permisoId: number,
    public readonly createdAt?: Date,
  ) {}
}
