export class CultivoHistorial {
  id!: number;
  cultivoId!: number;
  usuarioId?: number;
  motivo?: string;
  cambios?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}