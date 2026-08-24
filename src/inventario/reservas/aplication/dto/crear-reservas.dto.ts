import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ReservaEstadoEnum } from "../../domain/enums/reserva-estado.enum";

export class CrearReservaDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  insumoId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  cantidad!: number;

  @IsDateString()
  @IsNotEmpty()
  fechaReserva!: string;

  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsEnum(ReservaEstadoEnum)
  estado!: ReservaEstadoEnum 

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  usuarioId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  actividadId!: number;
}