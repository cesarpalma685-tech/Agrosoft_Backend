import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class RegistrarActividadInsumoUsoDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  insumoId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01, { message: 'La cantidad usada debe ser mayor a 0' })
  @IsNotEmpty()
  cantidadUsada!: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
