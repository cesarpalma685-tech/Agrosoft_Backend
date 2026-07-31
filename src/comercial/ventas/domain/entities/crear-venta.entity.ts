export class Venta {
  id!: number;
  fecha!: Date;
  clienteId!: number;
  subtotal!: number;
  impuestos!: number;
  descuento!: number;
  total!: number;
  estado!: string;
  usuarioId!: number;
  anuladaPorUsuarioId?: number;
  fechaAnulacion?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}