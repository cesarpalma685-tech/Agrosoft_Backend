import { IsInt, IsOptional } from 'class-validator';

export class UpdateUsuarioPermisoDto {
@IsOptional()
@IsInt()
usuarioId?: number;

@IsOptional()
@IsInt()
permisoId?: number;
}