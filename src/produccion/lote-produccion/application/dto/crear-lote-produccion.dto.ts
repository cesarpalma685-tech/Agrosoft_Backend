import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsDateString, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export const CALIDADES = ["excelente", "buena", "regular", "baja"] as const;

// El stock disponible, el costo total y el costo por kg los calcula el servidor.
export class CrearLoteProduccionDto {
  @Type(() => Number) @IsInt()
  cultivoId!: number;

  // Se toman del cultivo si no se envían
  @IsOptional() @Type(() => Number) @IsInt()
  loteId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  subLoteId?: number;

  // Producto del catálogo; si no se envía se usa (o crea) uno con el nombre del cultivo
  @IsOptional() @Type(() => Number) @IsInt()
  productoAgroId?: number;

  // Actividad de tipo Cosecha de la que viene el lote (opcional)
  @IsOptional() @Type(() => Number) @IsInt()
  actividadCosechaId?: number;

  @Type(() => Number) @IsNumber() @IsPositive()
  cantidadKg!: number;

  @IsOptional() @IsIn(CALIDADES, { message: `calidad debe ser una de: ${CALIDADES.join(", ")}` })
  calidad?: string;

  @IsOptional() @IsDateString()
  fechaCosecha?: string;

  @IsOptional() @IsString()
  responsable?: string;

  @IsOptional() @IsString()
  observaciones?: string;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  precioSugeridoKg?: number;
}

export class ActualizarLoteProduccionDto extends PartialType(CrearLoteProduccionDto) {}
