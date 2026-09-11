import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";

export class CrearFacturaDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  ventaId!: number;

  @IsString()
  @IsNotEmpty()
  numero!: string;

  @IsString()
  @IsOptional()
  prefijo?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaEmision!: string;

  @IsDateString()
  @IsNotEmpty()
  vencimiento!: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  qrUrl?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  pdfUrl?: string;
}
