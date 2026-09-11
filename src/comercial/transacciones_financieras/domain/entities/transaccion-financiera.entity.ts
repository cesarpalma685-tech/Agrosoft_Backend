export class TransaccionFinanciera {
  id!: number;
  tipo!: string;
  categoria!: string;
  monto!: number;
  descripcion?: string;
  fecha!: Date;
  actividadId?: number;
  insumoId?: number;
  ventaId?: number;
  usuarioId!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
