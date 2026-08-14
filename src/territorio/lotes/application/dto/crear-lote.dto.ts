import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CrearLoteDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  @IsNotEmpty()
  areaM2!: number;

  @IsNumber()
  @IsNotEmpty()
  areaHa!: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}