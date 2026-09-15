import {
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateNotificacionDto {
  @IsInt()
  usuarioId!: number;

  @IsString()
  titulo!: string;

  @IsString()
  mensaje!: string;

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
