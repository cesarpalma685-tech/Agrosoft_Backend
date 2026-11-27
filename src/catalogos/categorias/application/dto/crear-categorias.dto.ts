import { PartialType } from "@nestjs/mapped-types";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export const TIPOS_CATEGORIA = ["Insumo", "Herramienta"] as const;

export class CrearCategoriasDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsIn(TIPOS_CATEGORIA, { message: `tipo debe ser uno de: ${TIPOS_CATEGORIA.join(", ")}` })
  tipo!: string;
}

export class ActualizarCategoriasDto extends PartialType(CrearCategoriasDto) {}
