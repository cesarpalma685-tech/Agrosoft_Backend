import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CrearActividadInsumoUsoDto {
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
  cantidadUso!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costoUnitarioUso!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  movimientoInsumoId!: number;
}
