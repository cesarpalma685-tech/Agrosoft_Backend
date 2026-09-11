import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CrearAlmacenDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsOptional()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  ubicacion!: string;
}
