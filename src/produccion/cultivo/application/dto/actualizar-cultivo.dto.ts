import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { CrearCultivoDto } from "./crear-cultivo.dto";

export class ActualizarCultivoDto extends PartialType(CrearCultivoDto) {
  // Motivo del cambio: queda en el historial del cultivo (RF4.2)
  @IsOptional()
  @IsString()
  motivo?: string;
}
