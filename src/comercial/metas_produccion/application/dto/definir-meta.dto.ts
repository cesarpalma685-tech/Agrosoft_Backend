import { Type } from "class-transformer";
import { IsInt, IsNumber, IsPositive, Max, Min } from "class-validator";

export class DefinirMetaDto {
  @Type(() => Number) @IsInt()
  unidadProductivaId!: number;

  @Type(() => Number) @IsInt() @Min(2000) @Max(2100)
  anio!: number;

  @Type(() => Number) @IsNumber() @IsPositive()
  valorMeta!: number;
}
