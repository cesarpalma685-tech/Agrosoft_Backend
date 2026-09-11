export class MovimientoProduccion {
  id!: number;
  loteProduccionId!: number;
  tipo!: string;
  cantidadKg!: number;
  costoUnitarioKg?: number;
  costoTotal?: number;
  ventaId?: number;
  descripcion?: string;
  usuarioId?: number;
  fecha!: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
