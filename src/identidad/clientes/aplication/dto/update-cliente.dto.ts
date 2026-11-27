import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateClienteDto {
  @IsOptional()
  @IsIn(["NIT", "CC"])
  tipoIdentificacion?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

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
