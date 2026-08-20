import { IsInt, IsPositive, IsString, IsNotEmpty, IsObject } from 'class-validator';

export class RegistrarHistorialDto {
  @IsString()
  @IsNotEmpty()
  motivo!: string;

  @IsObject()
  cambios!: Record<string, any>;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}