import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CrearActividadResponsableDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  usuarioId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  horas!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precioHora!: number;
}
