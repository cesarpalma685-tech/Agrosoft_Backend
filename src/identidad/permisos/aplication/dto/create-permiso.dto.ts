import { IsString } from "class-validator";

export class CreatePermisoDto {
  @IsString()
  modulo!: string;

  @IsString()
  accion!: string;

  @IsString()
  clave!: string;
}
