export class LoteDto {
  id!: number;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date | null;

  nombre!: string;

  unidad_productiva_id!: number | null;

  geom: any;

  areaM2!: number;
  areaHa!: number;

  centroide: any;

  descripcion!: string | null;
  estado!: string;
}
