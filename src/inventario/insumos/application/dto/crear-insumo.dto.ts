import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { TipoInsumoEnum } from "../../domain/enums/tipo-insumo.enum";
import { EstadoInsumoEnum } from "../../domain/enums/estado-insumo.enum";

const num = () => Type(() => Number);

// Lo que no se envía se completa con valores por defecto y los derivados
// (stock en unidad de uso, precio de uso, valor del inventario) los calcula el servidor.
export class CrearInsumoDto {
  @IsString() @IsNotEmpty()
  nombre!: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @IsString()
  fotoUrl?: string;

  @IsOptional() @IsString()
  presentacionTipo?: string;

  @IsOptional() @num() @IsNumber() @IsPositive()
  presentacionCantidad?: number;

  @IsOptional() @IsString()
  presentacionUnidad?: string;

  @IsOptional() @IsString()
  unidadUso?: string;

  @IsOptional() @IsString()
  tipoMateria?: string;

  @IsOptional() @num() @IsNumber() @IsPositive()
  factorConversionUso?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  stockPresentacion?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  stockReservado?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  stockMinimo?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  precioUnitarioPresentacion?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  costoAdquisicion?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  valorResidual?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  vidaUtilHoras?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  horasUsadas?: number;

  @IsOptional() @num() @IsNumber() @Min(0)
  depreciacionAcumulada?: number;

  @num() @IsInt()
  categoriaId!: number;

  @num() @IsInt()
  almacenId!: number;

  @num() @IsInt()
  proveedorId!: number;

  @IsEnum(TipoInsumoEnum)
  tipoInsumo!: TipoInsumoEnum;

  @IsOptional() @IsEnum(EstadoInsumoEnum)
  estado?: EstadoInsumoEnum;

  @IsOptional() @IsDateString()
  fechaAdquisicion?: string;

  @IsOptional() @IsDateString()
  fechaUltimoMantenimiento?: string;

  @IsOptional() @IsDateString()
  fechaBaja?: string;
}

export class ActualizarInsumoDto extends PartialType(CrearInsumoDto) {}
