import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsInt,
} from "class-validator";

export class CrearSensorDto {
  @IsString()
  nombre_sensor!: string;

  @IsInt()
  tipo_sensor_id!: number;

  @IsString()
  protocolo!: string;

  @IsOptional()
  @IsString()
  endpoint_url?: string;

  @IsOptional()
  @IsString()
  mqtt_topic?: string;

  @IsOptional()
  @IsNumber()
  valor_minimo_sensor?: number;

  @IsOptional()
  @IsNumber()
  valor_maximo_sensor?: number;

  @IsBoolean()
  activo!: boolean;

  @IsOptional()
  @IsString()
  estado_conexion?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  ultimo_valor?: string;

  @IsOptional()
  ultima_medicion?: Date;

  @IsOptional()
  last_seen_at?: Date;

  @IsInt()
  cultivoId!: number;

  @IsInt()
  creadoPorUsuarioId!: number;

  @IsInt()
  global_config_id!: number;

  @IsInt()
  lote_id!: number;

  @IsInt()
  sub_lote_id!: number;
}
