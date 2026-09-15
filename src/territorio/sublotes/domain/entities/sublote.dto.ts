export class Sublote {
  id!: number;

  nombre!: string;

  lote_id!: number;

  geom!: object;

  areaM2!: number;

  areaHa!: number;

  centroide!: object;

  descripcion!: string;

  estado!: string;

  created_at!: Date;

  updated_at!: Date;

  deleted_at!: Date | null;
}
