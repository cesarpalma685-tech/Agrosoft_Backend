import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearActividadHistorialDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  usuarioId!: number;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsObject()
  @IsOptional()
  cambios?: Record<string, any>;
}
