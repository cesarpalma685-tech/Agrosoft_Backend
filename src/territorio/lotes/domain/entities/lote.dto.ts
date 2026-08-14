export class LoteDto {
  id!: number;
  created_at!: Date;
  updated_at! : Date;
  deleted_at!: Date | null;

  nombre!: string;

  geom: any;

  areaM2!: number;
  areaHa!: number;

  centroide: any;

  descripcion!: string;
  estado!: string;
}