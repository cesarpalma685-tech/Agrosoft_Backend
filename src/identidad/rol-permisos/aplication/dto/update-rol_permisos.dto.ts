import { IsInt, IsOptional } from "class-validator";

export class UpdateRolPermisoDto {
  @IsOptional()
  @IsInt()
  rolId?: number;

  @IsOptional()
  @IsInt()
  permisoId?: number;
}
