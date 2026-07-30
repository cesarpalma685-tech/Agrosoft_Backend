import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString() nombre!: string;
  @IsString() apellido!: string;
  @IsString() identificacion!: string;
  @IsOptional() @IsString() programaFormacionId!: string; 
  @IsInt() idFicha!: number; 
  @IsOptional() @IsString() telefono?: string;
  @IsEmail() correo!: string;
  @IsString() @MinLength(8) password!: string;
}