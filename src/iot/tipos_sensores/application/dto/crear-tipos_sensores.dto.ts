import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CrearTipoSensoresDto {
  @IsString()
  nombre!: string;

  @IsString()
  unidad!: string;

  @IsInt()
  @Min(0)
  decimales!: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsInt()
  @Min(1)
  ttl_minutos!: number;
}
