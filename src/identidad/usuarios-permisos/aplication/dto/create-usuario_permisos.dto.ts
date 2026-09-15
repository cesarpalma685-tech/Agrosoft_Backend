import { IsInt } from "class-validator";

export class CreateUsuarioPermisoDto {
  @IsInt()
  usuarioId!: number;

  @IsInt()
  permisoId!: number;
}
