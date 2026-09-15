import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CrearActividadInsumoDto {
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
  @Min(0.01)
  cantidadUsada!: number;

  @IsString()
  @IsNotEmpty()
  unidad!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costoUnitario!: number;
}
