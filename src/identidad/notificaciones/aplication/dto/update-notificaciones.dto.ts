import {
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateNotificacionDto {
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  mensaje?: string;

  @IsOptional()
  @IsBoolean()
  leida?: boolean;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
