import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { TipoInsumoEnum } from "../../domain/enums/tipo-insumo.enum";
import { EstadoInsumoEnum } from "../../domain/enums/estado-insumo.enum";

export class CrearInsumoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsOptional()
  fotourl?: string;

  @IsString()
  @IsNotEmpty()
  presentacionTipo!: string;

  @Type(() => Number)
  @IsNumber({}, { message: "La cantidad de presentación debe ser un número" })
  @IsPositive()
  presentacionCantidad!: number;

  @IsString()
  @IsNotEmpty()
  presentacionUnidad!: string;

  @IsString()
  @IsNotEmpty()
  unidadUso!: string;

  @IsString()
  @IsNotEmpty()
  tipoMaterial!: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  factorConversionUso!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stockPresentacion!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stockUso!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stockReservado!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stockMinimo!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precioUnitarioPresentacion!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precioUnitarioUso!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  costoUnitario!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  costoAdquisicion!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorInventario!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorResidual!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  vidaUtilHoras!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  horasUsadas!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  depreciacionAcumulada!: number;

  @Type(() => Number)
  @IsNumber()
  categoriaId!: number;

  @Type(() => Number)
  @IsNumber()
  almacenId!: number;

  @Type(() => Number)
  @IsNumber()
  proveedorId!: number;

  @Type(() => Number)
  @IsNumber()
  creadoPorUsuarioId!: number;

  @IsEnum(TipoInsumoEnum)
  tipoInsumo!: TipoInsumoEnum;

  @IsEnum(EstadoInsumoEnum)
  estadoInsumo!: EstadoInsumoEnum;
}
