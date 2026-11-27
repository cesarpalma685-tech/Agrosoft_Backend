export class Cultivo {
  id!: number;
  nombreCultivo!: string;
  tipoCultivo!: string;
  descripcion?: string;
  loteId!: number;
  subloteId?: number;
  encargadoId?: number | null;
  imgCultivo?: string;
  fechaSiembra!: Date;
  fechaFinalizacion?: Date;
  costoTotal?: number;
  estado?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
