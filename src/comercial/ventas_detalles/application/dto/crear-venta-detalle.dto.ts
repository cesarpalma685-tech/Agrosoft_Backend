import { 
  IsNotEmpty, 
  IsNumber, 
  IsPositive, 
  IsOptional, 
  Min 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearVentaDetalleDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  ventaId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  productoAgroId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  loteProduccionId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cultivoId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  cantidadKg!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precioUnitarioKg!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  precioTotal!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  costoUnitarioKg!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  costoTotal!: number;
}