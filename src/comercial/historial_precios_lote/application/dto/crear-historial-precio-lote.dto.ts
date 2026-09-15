import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class CrearHistorialPrecioLoteDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  loteProduccionId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precioAnterior!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precioNuevo!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  usuarioId!: number;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsOptional()
  razon?: string;
}
