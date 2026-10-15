import { IsBoolean, IsOptional, IsString } from "class-validator";

// El nombre no se puede cambiar: los 3 roles son fijos y los crea el seeder.
export class UpdateRolDto {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  es_sistema?: boolean;

  @IsOptional()
  @IsString()
  estado?: string;
}
