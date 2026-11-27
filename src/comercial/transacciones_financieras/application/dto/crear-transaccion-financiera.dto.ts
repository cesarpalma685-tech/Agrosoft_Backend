import { Type } from "class-transformer";
import { IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export const CATEGORIAS_TRANSACCION = [
  "Venta de cosecha",
  "Mano de obra y labores",
  "Control fitosanitario",
  "Compra de insumos",
  "Compra de herramientas",
  "Mantenimiento",
  "Transporte",
  "Otros ingresos",
] as const;

// Transacción manual (RF9.1). El usuario sale del token y el origen es siempre «manual».
export class CrearTransaccionFinancieraDto {
  @IsIn(["ingreso", "egreso"], { message: "tipo debe ser ingreso o egreso" })
  tipo!: string;

  @IsIn(CATEGORIAS_TRANSACCION, { message: `categoria debe ser una de: ${CATEGORIAS_TRANSACCION.join(", ")}` })
  categoria!: string;

  @Type(() => Number) @IsNumber() @IsPositive()
  monto!: number;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsDateString()
  fecha!: string;

  @IsOptional() @Type(() => Number) @IsInt()
  actividadId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  insumoId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  ventaId?: number;
}
