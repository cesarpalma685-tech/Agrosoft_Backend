import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class RegistrarUsoHerramientaDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  herramientaId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.1, { message: 'Las horas de uso deben ser mayores a 0' })
  @IsOptional()
  horasUso?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
