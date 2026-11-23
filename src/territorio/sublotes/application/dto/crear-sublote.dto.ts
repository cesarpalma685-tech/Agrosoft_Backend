import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsInt,
  IsString,
  ValidateNested,
} from "class-validator";
import { CoordenadaDto } from "./coordenada.dto";

export class CrearSubloteDto {
  @IsString()
  nombre!: string;

  @IsInt()
  lote_id!: number;

  // Puntos que digita el usuario (mínimo 3). El polígono, el área y el
  // centroide se calculan en el backend.
  @ArrayMinSize(3)
  @ValidateNested({ each: true })
  @Type(() => CoordenadaDto)
  coordenadas!: CoordenadaDto[];

  @IsString()
  descripcion!: string;

  @IsString()
  estado!: string;
}
