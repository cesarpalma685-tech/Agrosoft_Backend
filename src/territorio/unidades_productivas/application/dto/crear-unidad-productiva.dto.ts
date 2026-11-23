import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export const ESTADOS_UNIDAD = ["activa", "inactiva", "en_seguimiento", "en_riesgo"] as const;

export class CrearUnidadProductivaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  // Usuario responsable de la unidad (lista desplegable en el frontend)
  @IsOptional()
  @IsInt()
  responsable_id?: number | null;

  @IsIn(ESTADOS_UNIDAD, {
    message: `estado debe ser uno de: ${ESTADOS_UNIDAD.join(", ")}`,
  })
  estado!: string;
}
