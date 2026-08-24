export class ActividadInsumoUso {
  id!: number;
  actividadId!: number;
  insumoId!: number;
  cantidadUso!: number;
  costoUnitarioUso!: number;
  costoTotal!: number;
  movimientoInsumoId!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
