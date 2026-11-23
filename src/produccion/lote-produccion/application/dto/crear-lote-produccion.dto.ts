import { IsInt, IsOptional, IsString, IsNumber } from "class-validator";

export class CrearLoteProduccionDto {
  @IsInt()
  @IsOptional()
  productoAgroId?: number;

  // Si viene actividadCosechaId, estos campos se toman de la actividad
  @IsInt()
  @IsOptional()
  cultivoId?: number;

  @IsInt()
  @IsOptional()
  loteId?: number;

  @IsInt()
  @IsOptional()
  subLoteId?: number;

  @IsInt()
  @IsOptional()
  actividadCosechaId?: number;

  @IsString()
  @IsOptional()
  calidad?: string;

  // Si viene actividadCosechaId, se toma de kgRecolectados de la actividad
  @IsNumber()
  @IsOptional()
  cantidadKg?: number;

  @IsNumber()
  @IsOptional()
  stockDisponibleKg?: number;

  @IsNumber()
  @IsOptional()
  costoUnitarioKg?: number;

  @IsNumber()
  @IsOptional()
  costoTotal?: number;

  @IsNumber()
  @IsOptional()
  precioSugeridoKg?: number;
}
