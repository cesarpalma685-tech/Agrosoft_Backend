import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateLoteProduccionDto {
  @IsInt()
  @IsOptional()
  productoAgroId?: number;

  @IsInt()
  cultivoId!: number;

  @IsInt()
  loteId!: number;

  @IsInt()
  @IsOptional()
  subLoteId?: number;

  @IsInt()
  @IsOptional()
  actividadCosechaId?: number;

  @IsString()
  @IsOptional()
  calidad?: string;

  @IsNumber()
  cantidadKg!: number;

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