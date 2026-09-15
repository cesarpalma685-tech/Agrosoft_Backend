import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ["password", "correo"] as const),
) {}
