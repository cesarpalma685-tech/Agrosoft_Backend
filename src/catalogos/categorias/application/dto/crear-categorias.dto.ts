import { IsString } from "class-validator";

export class CrearCategoriasDto {
  @IsString()
  nombre!: string;

  @IsString()
  descripcion!: string;

  @IsString()
  tipoInsumo!: string;
}
