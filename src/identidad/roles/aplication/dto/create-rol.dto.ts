import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateRolDto {
  @IsString()
  @MinLength(3)
  nombre!: string;

  @IsString()
  descripcion!: string;

  @IsOptional()
  @IsBoolean()
  es_sistema?: boolean;
}
