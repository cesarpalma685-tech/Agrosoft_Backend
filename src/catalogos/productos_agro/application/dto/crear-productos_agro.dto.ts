import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductosAgroDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  unidadBase!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsOptional()
  imagen?: string;
}
