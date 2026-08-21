import { IsString, IsOptional, IsNotEmpty, IsInt, IsDateString, IsNumber } from 'class-validator';

export class CrearCultivoDto {
  @IsString()
  @IsNotEmpty()
  nombreCultivo!: string;

  @IsString()
  @IsNotEmpty()
  tipoCultivo!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  loteId!: number;

  @IsInt()
  @IsOptional()
  subloteId?: number;

  @IsString()
  @IsOptional()
  imgCultivo?: string;

  @IsDateString()
  fechaSiembra!: string;

  @IsDateString()
  @IsOptional()
  fechaFinalizacion?: string;

  @IsNumber()
  @IsOptional()
  costoTotal?: number;

  @IsString()
  @IsOptional()
  estado?: string;
}