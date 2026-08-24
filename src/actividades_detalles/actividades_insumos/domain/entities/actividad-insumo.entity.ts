export class ActividadInsumo {
  id!: number;
  actividadId!: number;
  insumoId!: number;
  cantidadUsada!: number;
  unidad!: string;
  costoUnitario!: number;
  costoTotal!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
