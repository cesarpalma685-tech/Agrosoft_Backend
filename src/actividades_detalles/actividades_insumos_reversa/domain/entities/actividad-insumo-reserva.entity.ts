export class ActividadInsumoReserva {
  id!: number;
  actividadId!: number;
  insumoId!: number;
  cantidadReservada!: number;
  estado?: string;
  observaciones?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
