export class LoteProduccion {
  id!: number;
  productoAgroId?: number;
  cultivoId!: number;
  loteId!: number;
  subLoteId?: number;
  actividadCosechaId?: number;
  calidad?: string;
  fechaCosecha?: string | null;
  responsable?: string | null;
  observaciones?: string | null;
  creadoPorUsuarioId?: number | null;
  cantidadKg!: number;
  stockDisponibleKg!: number;
  costoUnitarioKg?: number;
  costoTotal?: number;
  precioSugeridoKg?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
