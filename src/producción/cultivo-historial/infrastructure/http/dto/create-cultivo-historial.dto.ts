import { IsInt, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateCultivoHistorialDto {
  @IsInt()
  cultivoId!: number;

  @IsInt()
  @IsOptional()
  usuarioId?: number;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsObject()
  @IsOptional()
  cambios?: Record<string, unknown>;
}