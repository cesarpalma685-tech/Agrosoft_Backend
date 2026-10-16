import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SolicitarRecuperacionDto {
  @IsEmail({}, { message: "El correo electrónico no es válido" })
  @IsNotEmpty({ message: "El correo es obligatorio" })
  email!: string;
}

export class RestablecerPasswordDto {
  @IsString()
  @IsNotEmpty({ message: "El token es obligatorio" })
  token!: string;

  @IsString()
  @MinLength(8, { message: "La nueva contraseña debe tener al menos 8 caracteres" })
  passwordNueva!: string;
}
