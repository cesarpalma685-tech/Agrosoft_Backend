import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AsignarActividadHerramientaDto {
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
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  @IsNotEmpty()
  cantidad!: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
