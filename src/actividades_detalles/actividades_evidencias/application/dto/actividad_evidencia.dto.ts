import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CrearActividadEvidenciaDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'El campo archivoUrl debe ser una URL válida' })
  archivoUrl!: string;

  @IsString()
  @IsOptional()
  tipoArchivo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
