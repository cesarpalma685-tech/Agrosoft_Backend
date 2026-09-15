import { IsInt } from "class-validator";

export class CreateRolPermisoDto {
  @IsInt()
  rolId!: number;

  @IsInt()
  permisoId!: number;
}
