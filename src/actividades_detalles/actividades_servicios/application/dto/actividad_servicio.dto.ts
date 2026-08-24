import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ContratarActividadServicioDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  servicioId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'El costo no puede ser negativo' })
  @IsNotEmpty()
  costo!: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
