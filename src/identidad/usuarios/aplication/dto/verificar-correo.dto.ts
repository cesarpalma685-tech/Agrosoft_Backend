import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class VerificarCorreoDto {
  @IsEmail({}, { message: "El correo electrónico no es válido" })
  correo!: string;

  @IsString()
  @Length(6, 6, { message: "El código tiene 6 caracteres" })
  codigo!: string;
}

export class ReenviarCodigoDto {
  @IsEmail({}, { message: "El correo electrónico no es válido" })
  @IsNotEmpty({ message: "El correo es obligatorio" })
  correo!: string;
}
