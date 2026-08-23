import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ReservarActividadInsumoDto {
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
  @Min(0.01, { message: 'La cantidad reservada debe ser mayor a 0' })
  @IsNotEmpty()
  cantidadReservada!: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
