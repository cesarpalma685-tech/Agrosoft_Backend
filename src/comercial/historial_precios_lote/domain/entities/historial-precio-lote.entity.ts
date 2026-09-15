export class HistorialPrecioLote {
  id!: number;
  loteProduccionId!: number;
  precioAnterior!: number;
  precioNuevo!: number;
  usuarioId!: number;
  fecha!: Date;
  razon?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
