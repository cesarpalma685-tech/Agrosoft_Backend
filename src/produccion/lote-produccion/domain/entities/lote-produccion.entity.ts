export class LoteProduccion {
  id!: number;
  productoAgroId?: number;
  cultivoId!: number;
  loteId!: number;
  subLoteId?: number;
  actividadCosechaId?: number;
  calidad?: string;
  cantidadKg!: number;
  stockDisponibleKg!: number;
  costoUnitarioKg?: number;
  costoTotal?: number;
  precioSugeridoKg?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
