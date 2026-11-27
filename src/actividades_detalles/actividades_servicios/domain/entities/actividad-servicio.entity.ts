export class ActividadServicio {
  id!: number;
  actividadId!: number;
  maquinariaId?: number | null;
  nombreServicio!: string;
  horas!: number;
  precioHora!: number;
  costo!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
