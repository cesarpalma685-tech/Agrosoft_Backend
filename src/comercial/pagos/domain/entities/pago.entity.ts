export class Pago {
  id!: number;
  ventaId!: number;
  metodo!: string;
  monto!: number;
  moneda!: string;
  referencia?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
