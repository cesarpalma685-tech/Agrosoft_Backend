import { IsOptional, IsString } from 'class-validator';

export class UpdatePermisoDto {
@IsOptional()
@IsString()
modulo?: string;

@IsOptional()
@IsString()
accion?: string;

@IsOptional()
@IsString()
clave?: string;
}