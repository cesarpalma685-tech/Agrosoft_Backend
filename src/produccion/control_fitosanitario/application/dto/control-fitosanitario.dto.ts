import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, Min } from "class-validator";

const IMAGEN = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

export const GRAVEDADES = ["baja", "media", "alta", "critica"] as const;
export const ESTADOS_CONTINGENCIA = ["activa", "en_seguimiento", "resuelta", "cerrada"] as const;
export const ESTADOS_TRATAMIENTO = ["programado", "en_ejecucion", "seguimiento", "finalizado"] as const;

export class CrearContingenciaDto {
  @IsString() @IsNotEmpty()
  nombre!: string;

  @IsString() @IsNotEmpty()
  tipo!: string;

  @IsOptional() @Type(() => Number) @IsInt()
  epaId?: number;

  // Si se indica el cultivo, el lote y el sublote se toman de él
  @IsOptional() @Type(() => Number) @IsInt()
  cultivoId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  loteId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  subLoteId?: number;

  @IsOptional() @IsString()
  zona?: string;

  @IsDateString()
  fecha!: string;

  @IsIn(GRAVEDADES, { message: `gravedad debe ser una de: ${GRAVEDADES.join(", ")}` })
  gravedad!: string;

  @IsOptional() @IsIn(ESTADOS_CONTINGENCIA, { message: `estado debe ser uno de: ${ESTADOS_CONTINGENCIA.join(", ")}` })
  estado?: string;

  @IsString() @IsNotEmpty()
  descripcion!: string;

  @IsOptional() @IsArray() @ArrayMaxSize(6) @IsString({ each: true }) @Matches(IMAGEN, { each: true, message: "Cada foto debe ser JPEG, PNG o WEBP en base64" }) @MaxLength(600_000, { each: true, message: "Una foto es demasiado grande" })
  evidencias?: string[];
}

export class ActualizarContingenciaDto extends PartialType(CrearContingenciaDto) {}

export class CrearTratamientoDto {
  @IsString() @IsNotEmpty()
  nombre!: string;

  @IsString() @IsNotEmpty()
  tipo!: string;

  @Type(() => Number) @IsInt()
  cultivoId!: number;

  @IsOptional() @Type(() => Number) @IsInt()
  loteId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  subLoteId?: number;

  @IsDateString()
  fechaAplicacion!: string;

  @IsString() @IsNotEmpty()
  responsable!: string;

  @IsString() @IsNotEmpty()
  producto!: string;

  @IsString() @IsNotEmpty()
  dosis!: string;

  @IsString() @IsNotEmpty()
  metodoAplicacion!: string;

  // Contingencia que origina el tratamiento (opcional: puede ser preventivo)
  @IsOptional() @Type(() => Number) @IsInt()
  contingenciaId?: number;

  @IsOptional() @IsIn(ESTADOS_TRATAMIENTO, { message: `estado debe ser uno de: ${ESTADOS_TRATAMIENTO.join(", ")}` })
  estado?: string;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  costo?: number;
}

export class ActualizarTratamientoDto extends PartialType(CrearTratamientoDto) {}

export class DecidirAprobacionDto {
  @IsIn(["aprobado", "rechazado"], { message: "decision debe ser aprobado o rechazado" })
  decision!: string;

  @IsOptional() @IsString()
  observaciones?: string;
}
