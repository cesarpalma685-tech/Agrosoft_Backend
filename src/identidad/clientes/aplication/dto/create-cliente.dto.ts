import { IsIn, IsOptional, IsString } from "class-validator";

export class CreateClienteDto {
  @IsOptional()
  @IsIn(["NIT", "CC"])
  tipoIdentificacion?: string;

  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  identificacion?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}
