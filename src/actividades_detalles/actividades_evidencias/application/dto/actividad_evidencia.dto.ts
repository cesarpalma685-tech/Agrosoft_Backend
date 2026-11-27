import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  Matches,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CrearActividadEvidenciaDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  // Imágenes en base64 (data URL jpeg/png/webp): máx. 4, de ~450 KB cada una
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(4)
  @IsString({ each: true })
  @Matches(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/, { each: true, message: "Cada imagen debe ser JPEG, PNG o WEBP en base64" })
  @MaxLength(600_000, { each: true, message: "Una imagen es demasiado grande" })
  imagenes?: string[];
}
