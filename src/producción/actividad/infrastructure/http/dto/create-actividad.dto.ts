import { IsString, IsOptional, IsNotEmpty, IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsString()
  @IsOptional()
  subtipo?: string;

  @IsInt()
  loteId!: number;

  @IsInt()
  @IsOptional()
  subLoteId?: number;

  @IsInt()
  cultivoId!: number;

  @IsDateString()
  fecha!: string;

  @IsNumber()
  @IsOptional()
  horasActividad?: number;

  @IsNumber()
  @IsOptional()
  precioHoraActividad?: number;

  @IsNumber()
  @IsOptional()
  costoManoObra?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsInt()
  @IsOptional()
  creadoPorUsuarioId?: number;

  @IsInt()
  @IsOptional()
  cantidadPlantas?: number;

  @IsNumber()
  @IsOptional()
  kgRecolectados?: number;

  @IsInt()
  @IsOptional()
  productoAgroId?: number;
}