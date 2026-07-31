export class VentaDetalle {
  id!: number;
  ventaId!: number;
  productoAgroId!: number;
  loteProduccionId?: number;
  cultivoId?: number;
  cantidadKg!: number;
  precioUnitarioKg!: number;
  precioTotal!: number;
  costoUnitarioKg!: number;
  costoTotal!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}