import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class LineaVentaDto {
  // Cosecha (lote de producción) de la que sale lo que se vende
  @Type(() => Number) @IsInt()
  loteProduccionId!: number;

  @Type(() => Number) @IsNumber() @IsPositive()
  cantidadKg!: number;

  @Type(() => Number) @IsNumber() @Min(0)
  precioUnitarioKg!: number;
}

// El subtotal, el total, el costo y el estado los calcula el servidor (RF8.3 y RF8.7).
export class CrearVentaDto {
  @IsDateString()
  fecha!: string;

  @Type(() => Number) @IsInt()
  clienteId!: number;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  descuento?: number;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  impuestos?: number;

  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(50) @ValidateNested({ each: true }) @Type(() => LineaVentaDto)
  detalles!: LineaVentaDto[];
}

export const METODOS_PAGO = ["Transferencia", "Consignación"] as const;

export class RegistrarPagoDto {
  @IsIn(METODOS_PAGO, { message: `metodo debe ser uno de: ${METODOS_PAGO.join(", ")}` })
  metodo!: string;

  @Type(() => Number) @IsNumber() @IsPositive()
  monto!: number;

  @IsOptional() @IsString() @IsNotEmpty()
  referencia?: string;
}

export class AnularVentaDto {
  @IsString() @IsNotEmpty()
  motivo!: string;
}
