import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export const PROTOCOLOS = ["MQTT", "HTTP"] as const;

export class CrearSensorDto {
  @IsString() @IsNotEmpty()
  nombre_sensor!: string;

  // Si no se envía se genera con el tipo y el id (p. ej. TMP-004)
  @IsOptional() @IsString() @IsNotEmpty()
  codigo?: string;

  @Type(() => Number) @IsInt()
  tipo_sensor_id!: number;

  @IsIn(PROTOCOLOS, { message: `protocolo debe ser uno de: ${PROTOCOLOS.join(", ")}` })
  protocolo!: string;

  @IsOptional() @IsString()
  endpoint_url?: string;

  @IsOptional() @IsString()
  mqtt_topic?: string;

  // Rango óptimo del cultivo: fuera de él se genera una alerta (RF10.3)
  @Type(() => Number) @IsNumber()
  valor_minimo_sensor!: number;

  @Type(() => Number) @IsNumber()
  valor_maximo_sensor!: number;

  @IsBoolean()
  activo!: boolean;

  @IsOptional() @Type(() => Number) @IsInt()
  cultivoId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  lote_id?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  sub_lote_id?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  global_config_id?: number;
}

export class ActualizarSensorDto extends PartialType(CrearSensorDto) {}

export class RegistrarLecturaDto {
  @Type(() => Number) @IsInt()
  sensor_id!: number;

  // Número con punto o coma decimal
  @Type(() => String) @IsNotEmpty()
  valor!: string | number;

  @IsOptional() @IsDateString()
  fecha_lectura?: string;

  @IsOptional() @IsString()
  unidad?: string;

  @IsOptional() @IsString()
  observaciones?: string;
}

export class LecturaManualDto {
  @Type(() => String) @IsNotEmpty()
  valor!: string | number;

  @IsOptional() @IsString()
  observaciones?: string;
}

export class GuardarConfigDto {
  @IsString() @IsNotEmpty()
  name!: string;

  @IsString() @IsNotEmpty()
  broker!: string;

  @Type(() => Number) @IsInt() @Min(1) @Max(65535)
  port!: number;

  @IsIn(PROTOCOLOS, { message: `protocol debe ser uno de: ${PROTOCOLOS.join(", ")}` })
  protocol!: string;

  @IsOptional() @IsString()
  topic_prefix?: string;

  @IsOptional() @IsString()
  default_topics?: string;

  @IsOptional() @IsString()
  custom_topics?: string;

  @IsOptional() @Type(() => Number) @IsInt()
  lote_id?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  sub_lote_id?: number;

  @IsOptional() @IsString()
  username?: string;

  // Solo se cambia si se envía
  @IsOptional() @IsString()
  password?: string;

  @IsBoolean()
  activo!: boolean;

  @IsOptional() @IsBoolean()
  auto_discover?: boolean;
}

export class ProbarConexionDto {
  @IsString() @IsNotEmpty()
  broker!: string;

  @Type(() => Number) @IsInt() @Min(1) @Max(65535)
  port!: number;
}
