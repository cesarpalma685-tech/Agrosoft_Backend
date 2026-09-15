import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsPositive,
} from "class-validator";
import { Type } from "class-transformer";

export class CrearTransaccionFinancieraDto {
  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  monto!: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  insumoId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ventaId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  usuarioId!: number;
}
