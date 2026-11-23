export class UnidadProductivaDto {
  id!: number;
  nombre!: string;
  descripcion!: string | null;
  responsable_id!: number | null;
  estado!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date | null;
}
