export class TiposSensores {
  id!: number;

  nombre!: string;

  unidad!: string;

  decimales!: number;

  descripcion!: string | null;

  imagen!: string | null;

  ttl_minutos!: number;

  created_at!: Date;

  updated_at!: Date;

  deleted_at!: Date | null;
}