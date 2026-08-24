import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearActividadEvidenciaDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagenes?: string[];
}
