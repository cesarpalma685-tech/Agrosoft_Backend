import { 
  IsNotEmpty, 
  IsNumber, 
  IsPositive, 
  IsString, 
  IsDateString, 
  IsOptional, 
  Min 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearVentaDto {
  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  clienteId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  subtotal!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  impuestos!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  descuento!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  total!: number;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  usuarioId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  anuladaPorUsuarioId?: number;

  @IsDateString()
  @IsOptional()
  fechaAnulacion?: string;
}