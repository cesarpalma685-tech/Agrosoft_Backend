import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductosAgroDto {
  id!: number;

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
