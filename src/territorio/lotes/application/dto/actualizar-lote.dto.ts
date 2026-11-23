import { PartialType } from "@nestjs/mapped-types";
import { CrearLoteDto } from "./crear-lote.dto";

export class ActualizarLoteDto extends PartialType(CrearLoteDto) {}
