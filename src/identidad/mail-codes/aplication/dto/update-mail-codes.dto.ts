import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateEmailCodeDto {
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;

  @IsOptional()
  @IsDateString()
  usedAt?: Date;
}
