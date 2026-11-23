import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CoordenadaDto } from "../../../sublotes/application/dto/coordenada.dto";

export class CrearLoteDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsInt()
  unidad_productiva_id!: number;

  // Puntos que digita el usuario (mínimo 3). El polígono, el área y el
  // centroide se calculan en el backend.
  @ArrayMinSize(3)
  @ValidateNested({ each: true })
  @Type(() => CoordenadaDto)
  coordenadas!: CoordenadaDto[];

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;
}
