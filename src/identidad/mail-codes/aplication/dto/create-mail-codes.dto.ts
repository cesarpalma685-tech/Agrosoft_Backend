import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateEmailCodeDto {
  @IsInt()
  usuarioId!: number;

  @IsString()
  tipo!: string;

  @IsString()
  code!: string;

  @IsDateString()
  expiresAt!: Date;
}
