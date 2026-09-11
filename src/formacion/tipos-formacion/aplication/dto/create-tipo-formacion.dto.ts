import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTipoFormacionDto {
  @IsString()
  codigo!: string;

  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  tipoEpaEnum?: string;

  @IsOptional()
  @IsInt()
  orden?: number;
}
