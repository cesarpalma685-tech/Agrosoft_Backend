import {
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";
import {
  ROLES_ASIGNABLES_EN_REGISTRO,
  RolNombre,
} from "../../../roles/domain/enums/rol-nombre.enum";
import { ProgramaFormacionNombre } from "../../../../formacion/programas-formacion/domain/enums/programa-formacion-nombre.enum";

const esAprendiz = (dto: CreateUsuarioDto) =>
  (dto.rol ?? RolNombre.APRENDIZ) === RolNombre.APRENDIZ;

export class CreateUsuarioDto {
  @IsString()
  nombre!: string;

  @IsString()
  apellido!: string;

  @IsString()
  identificacion!: string;

  // Obligatorio para Aprendiz; opcional para Encargado Técnico
  @ValidateIf((dto: CreateUsuarioDto) => esAprendiz(dto) || dto.programaFormacion != null)
  @IsEnum(ProgramaFormacionNombre, {
    message: `programaFormacion debe ser uno de: ${Object.values(ProgramaFormacionNombre).join(", ")}`,
  })
  programaFormacion?: ProgramaFormacionNombre;

  // Obligatorio para Aprendiz; opcional para Encargado Técnico
  @ValidateIf((dto: CreateUsuarioDto) => esAprendiz(dto) || dto.idFicha != null)
  @IsInt()
  idFicha?: number;

  @IsOptional()
  @IsString()
  telefono?: string;

  // Data URL de la imagen, ej: "data:image/jpeg;base64,..." (máx. ~1 MB)
  @IsOptional()
  @IsString()
  @Matches(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/, {
    message: "fotoPerfil debe ser una imagen JPEG, PNG o WEBP en base64",
  })
  @MaxLength(1_400_000, { message: "fotoPerfil es demasiado grande (máx. 1 MB)" })
  fotoPerfil?: string;

  @IsEmail()
  correo!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  // Administrador no se acepta aquí: solo lo crea el seeder
  @IsOptional()
  @IsIn(ROLES_ASIGNABLES_EN_REGISTRO, {
    message: `rol debe ser uno de: ${ROLES_ASIGNABLES_EN_REGISTRO.join(", ")}`,
  })
  rol?: RolNombre;
}
