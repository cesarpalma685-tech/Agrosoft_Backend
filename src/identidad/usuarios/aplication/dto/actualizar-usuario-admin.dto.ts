import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsIn, IsInt, IsOptional, IsString, Matches, MaxLength } from "class-validator";
import { RolNombre } from "../../../roles/domain/enums/rol-nombre.enum";
import { ProgramaFormacionNombre } from "../../../../formacion/programas-formacion/domain/enums/programa-formacion-nombre.enum";

// Cada quien edita su perfil (nombre, apellido, teléfono, foto); el administrador edita todo.
export class ActualizarUsuarioAdminDto {
  @IsOptional() @IsString()
  nombre?: string;

  @IsOptional() @IsString()
  apellido?: string;

  @IsOptional() @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  @Matches(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/, { message: "fotoPerfil debe ser una imagen JPEG, PNG o WEBP en base64" })
  @MaxLength(1_400_000, { message: "fotoPerfil es demasiado grande (máx. 1 MB)" })
  fotoPerfil?: string;

  // Solo administrador:
  @IsOptional() @IsString()
  identificacion?: string;

  @IsOptional() @IsEmail()
  correo?: string;

  @IsOptional() @IsEnum(RolNombre, { message: `rol debe ser uno de: ${Object.values(RolNombre).join(", ")}` })
  rol?: RolNombre;

  @IsOptional() @IsIn(["activo", "inactivo"], { message: "estado debe ser activo o inactivo" })
  estado?: string;

  @IsOptional() @IsEnum(ProgramaFormacionNombre, { message: `programaFormacion debe ser uno de: ${Object.values(ProgramaFormacionNombre).join(", ")}` })
  programaFormacion?: ProgramaFormacionNombre;

  @IsOptional() @Type(() => Number) @IsInt()
  idFicha?: number;
}
