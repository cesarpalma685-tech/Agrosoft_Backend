import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsInt,
} from "class-validator";

export class CrearEpaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  tipoEpa!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  sintomas?: string;

  @IsString()
  @IsOptional()
  manejoYControl?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  mesesProbables?: number[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  temporadas?: string[];

  @IsString()
  @IsOptional()
  notasEstacionalidad?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fotosSintomas?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fotosGenerales?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsInt()
  @IsOptional()
  creadoPorUsuarioId?: number;
}
