import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CrearActividadServicioDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  maquinariaId!: number;

  @IsString()
  @IsNotEmpty()
  nombreServicio!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  horas!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precioHora!: number;
}
