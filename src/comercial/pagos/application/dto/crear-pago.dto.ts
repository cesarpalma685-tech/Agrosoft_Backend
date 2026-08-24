import { 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsPositive, 
  IsOptional 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearPagoDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  ventaId!: number;

  @IsString()
  @IsNotEmpty()
  metodo!: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  monto!: number;

  @IsString()
  @IsNotEmpty()
  moneda!: string;

  @IsString()
  @IsOptional()
  referencia?: string;
}