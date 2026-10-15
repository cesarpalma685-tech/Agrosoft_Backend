import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { RolNombre } from "../../domain/enums/rol-nombre.enum";

export class CreateRolDto {
  @IsEnum(RolNombre, {
    message: `nombre debe ser uno de: ${Object.values(RolNombre).join(", ")}`,
  })
  nombre!: RolNombre;

  @IsString()
  descripcion!: string;

  @IsOptional()
  @IsBoolean()
  es_sistema?: boolean;
}
