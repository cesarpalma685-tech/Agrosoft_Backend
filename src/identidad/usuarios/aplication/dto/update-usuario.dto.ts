import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUsuarioDto } from "./create-usuario.dto";

// El rol no se cambia por este endpoint (evita auto-asignarse privilegios)
export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ["password", "correo", "rol"] as const),
) {}
