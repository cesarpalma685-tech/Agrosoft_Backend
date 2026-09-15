import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
} from "class-validator";

export class CrearMovimientoProduccionDto {
  @IsInt()
  loteProduccionId!: number;

  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsNumber()
  cantidadKg!: number;

  @IsNumber()
  @IsOptional()
  costoUnitarioKg?: number;

  @IsNumber()
  @IsOptional()
  costoTotal?: number;

  @IsInt()
  @IsOptional()
  ventaId?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @IsOptional()
  usuarioId?: number;

  @IsDateString()
  @IsOptional()
  fecha?: string;
}
