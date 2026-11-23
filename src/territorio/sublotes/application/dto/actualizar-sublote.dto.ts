import { PartialType } from "@nestjs/mapped-types";
import { CrearSubloteDto } from "./crear-sublote.dto";

export class ActualizarSubloteDto extends PartialType(CrearSubloteDto) {}
