import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min } from "class-validator";

const IMAGEN = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

export class CrearEpaDto {
  @IsString() @IsNotEmpty()
  nombre!: string;

  // Nombre de un tipo del catálogo de tipos de EPA (plaga, enfermedad…)
  @IsString() @IsNotEmpty()
  tipoEpa!: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @IsString()
  sintomas?: string;

  @IsOptional() @IsString()
  manejoYControl?: string;

  // Meses del año en que es probable (1 a 12)
  @IsOptional() @IsArray() @ArrayMaxSize(12) @Type(() => Number) @IsInt({ each: true }) @Min(1, { each: true }) @Max(12, { each: true })
  mesesProbables?: number[];

  @IsOptional() @IsArray() @ArrayMaxSize(6) @IsString({ each: true })
  temporadas?: string[];

  @IsOptional() @IsString()
  notasEstacionalidad?: string;

  // Fotografías en base64 (JPEG, PNG o WEBP): hasta 4 de síntomas y 4 generales
  @IsOptional() @IsArray() @ArrayMaxSize(4) @IsString({ each: true }) @Matches(IMAGEN, { each: true, message: "Cada foto debe ser JPEG, PNG o WEBP en base64" }) @MaxLength(600_000, { each: true, message: "Una foto es demasiado grande" })
  fotosSintomas?: string[];

  @IsOptional() @IsArray() @ArrayMaxSize(4) @IsString({ each: true }) @Matches(IMAGEN, { each: true, message: "Cada foto debe ser JPEG, PNG o WEBP en base64" }) @MaxLength(600_000, { each: true, message: "Una foto es demasiado grande" })
  fotosGenerales?: string[];

  @IsOptional() @IsArray() @ArrayMaxSize(20) @IsString({ each: true })
  tags?: string[];

  // Tipos de cultivo que afecta (catálogo de la wiki)
  @IsOptional() @IsArray() @Type(() => Number) @IsInt({ each: true })
  tiposCultivoIds?: number[];
}

export class ActualizarEpaDto extends PartialType(CrearEpaDto) {}
