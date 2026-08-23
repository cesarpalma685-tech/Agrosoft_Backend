import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AsignarActividadResponsableDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  personaId!: number;

  @IsString()
  @IsOptional()
  rol?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
