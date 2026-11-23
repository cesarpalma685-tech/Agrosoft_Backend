import { PartialType } from "@nestjs/mapped-types";
import { CrearUnidadProductivaDto } from "./crear-unidad-productiva.dto";

export class ActualizarUnidadProductivaDto extends PartialType(CrearUnidadProductivaDto) {}
