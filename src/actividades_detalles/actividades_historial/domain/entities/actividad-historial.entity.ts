export class ActividadHistorial {
  id!: number;
  actividadId!: number;
  usuarioId!: number;
  motivo?: string;
  cambios?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
