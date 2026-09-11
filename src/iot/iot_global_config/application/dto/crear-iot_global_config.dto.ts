import { IsBoolean, IsInt, IsString } from "class-validator";

export class CrearIotGlobalConfigDto {
  @IsString()
  name!: string;

  @IsString()
  broker!: string;

  @IsInt()
  port!: number;

  @IsString()
  protocol!: string;

  @IsString()
  topic_prefix!: string;

  @IsString()
  default_topics!: string;

  @IsString()
  custom_topics!: string;

  @IsInt()
  lote_id!: number;

  @IsInt()
  sub_lote_id!: number;

  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsBoolean()
  activo!: boolean;

  @IsBoolean()
  default_sensors_initialized!: boolean;

  @IsBoolean()
  auto_discover!: boolean;
}
