import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProgramaFormacionDto {
  @IsString()
  numeroFicha!: string;

  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: Date;

  @IsOptional()
  @IsDateString()
  fechaFin?: Date;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsInt()
  cantidadAprendices?: number;
}
