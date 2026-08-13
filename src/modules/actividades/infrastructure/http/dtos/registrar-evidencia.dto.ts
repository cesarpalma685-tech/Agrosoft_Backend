import { IsInt, IsPositive, IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class RegistrarEvidenciaDto {
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagenes?: string[];

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}