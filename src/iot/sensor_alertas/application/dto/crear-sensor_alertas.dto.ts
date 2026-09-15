import {
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";

export class CrearSensorAlertasDto {
  @IsInt()
  sensor_id!: number;

  @IsNumber()
  valor!: number;

  @IsNumber()
  umbral!: number;

  @IsString()
  @MaxLength(10)
  tipo!: string;

  @IsDateString()
  fecha_alerta!: string;

  @IsInt()
  lote_id!: number;

  @IsInt()
  sub_lote_id!: number;
}
