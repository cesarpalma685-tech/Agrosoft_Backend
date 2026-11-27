import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { TipoMovimientoInsumoEnum } from "../../domain/enum/tipo-movimiento-insumo.enum";

// La cantidad en unidad de uso, los costos derivados y el valor resultante los calcula el servidor.
export class CrearMovimientoIsumoDto {
  @Type(() => Number) @IsInt()
  insumoId!: number;

  @IsEnum(TipoMovimientoInsumoEnum)
  tipo!: TipoMovimientoInsumoEnum;

  // ENTRADA/SALIDA: cantidad que entra o sale. AJUSTE: conteo real que queda. TRASLADO: cantidad que se mueve.
  @Type(() => Number) @IsNumber() @Min(0)
  cantidadPresentacion!: number;

  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  costoUnitarioPresentacion?: number;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @Type(() => Number) @IsInt()
  actividadId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  almacenOrigenId?: number;

  @IsOptional() @Type(() => Number) @IsInt()
  almacenDestinoId?: number;
}
