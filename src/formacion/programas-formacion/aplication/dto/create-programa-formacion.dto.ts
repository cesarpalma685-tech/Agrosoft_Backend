import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { ProgramaFormacionNombre } from "../../domain/enums/programa-formacion-nombre.enum";

export class CreateProgramaFormacionDto {
  @IsString()
  numeroFicha!: string;

  @IsEnum(ProgramaFormacionNombre, {
    message: `nombre debe ser uno de: ${Object.values(ProgramaFormacionNombre).join(", ")}`,
  })
  nombre!: ProgramaFormacionNombre;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: Date;

  @IsOptional()
  @IsDateString()
  fechaFin?: Date;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsInt()
  cantidadAprendices?: number;
}
