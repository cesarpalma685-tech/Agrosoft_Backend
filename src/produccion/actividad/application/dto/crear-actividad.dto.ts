import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class ResponsableActividadDto {
  @Type(() => Number) @IsInt()
  usuarioId!: number;

  @Type(() => Number) @IsNumber() @Min(0)
  horas!: number;

  @Type(() => Number) @IsNumber() @Min(0)
  precioHora!: number;
}

export class ReservaInsumoDto {
  @Type(() => Number) @IsInt()
  insumoId!: number;

  // En la unidad de uso del insumo (g, ml, und…)
  @Type(() => Number) @IsNumber() @Min(0.01)
  cantidad!: number;
}

export class ReservaHerramientaDto {
  @Type(() => Number) @IsInt()
  insumoId!: number;

  @Type(() => Number) @IsNumber() @Min(0.01)
  horasEstimadas!: number;
}

export class CrearActividadDto {
  @IsString() @IsNotEmpty()
  nombre!: string;

  @IsString() @IsNotEmpty()
  tipo!: string;

  @IsOptional() @IsString()
  subtipo?: string;

  // Si no se envían, se toman del cultivo (lote y sublote donde está sembrado)
  @IsOptional() @IsInt()
  loteId?: number;

  @IsOptional() @IsInt()
  subLoteId?: number;

  @IsInt()
  cultivoId!: number;

  @IsDateString()
  fecha!: string;

  @IsOptional() @IsString()
  descripcion?: string;

  @IsOptional() @IsString()
  estado?: string;

  @IsOptional() @IsInt() @Min(0)
  cantidadPlantas?: number;

  @IsOptional() @IsNumber() @Min(0)
  kgRecolectados?: number;

  @IsOptional() @IsInt()
  productoAgroId?: number;

  // Mano de obra: el costo de cada responsable es horas × precio por hora (RF5.2)
  @IsOptional() @IsArray() @ArrayMaxSize(30) @ValidateNested({ each: true }) @Type(() => ResponsableActividadDto)
  responsables?: ResponsableActividadDto[];

  // Insumos que se reservan para la actividad: bajan del disponible, no del stock total (RF5.4)
  @IsOptional() @IsArray() @ArrayMaxSize(50) @ValidateNested({ each: true }) @Type(() => ReservaInsumoDto)
  insumos?: ReservaInsumoDto[];

  // Herramientas que quedan ocupadas durante la actividad (RF5.5)
  @IsOptional() @IsArray() @ArrayMaxSize(50) @ValidateNested({ each: true }) @Type(() => ReservaHerramientaDto)
  herramientas?: ReservaHerramientaDto[];
}

class CamposActividadDto {
  @IsString() @IsNotEmpty() nombre!: string;
  @IsString() @IsNotEmpty() tipo!: string;
  @IsString() subtipo!: string;
  @IsString() descripcion!: string;
  @IsString() estado!: string;
  @IsDateString() fecha!: string;
  @IsInt() @Min(0) cantidadPlantas!: number;
}

export class RegistrarServicioDto {
  @IsString() @IsNotEmpty()
  nombreServicio!: string;

  // Maquinaria del inventario (opcional)
  @IsOptional() @Type(() => Number) @IsInt()
  maquinariaId?: number;

  @Type(() => Number) @IsNumber() @Min(0.01)
  horas!: number;

  @Type(() => Number) @IsNumber() @Min(0)
  precioHora!: number;
}

export class UsoInsumoRealDto {
  @Type(() => Number) @IsInt()
  insumoId!: number;

  // Lo realmente gastado, en la unidad de uso (no puede superar lo reservado)
  @Type(() => Number) @IsNumber() @Min(0)
  cantidadUsada!: number;
}

export class UsoHerramientaRealDto {
  @Type(() => Number) @IsInt()
  insumoId!: number;

  @Type(() => Number) @IsNumber() @Min(0)
  horasUsadas!: number;
}

export class CompletarActividadDto {
  // Si no se indica un insumo o herramienta, se toma lo reservado / estimado
  @IsOptional() @IsArray() @ArrayMaxSize(50) @ValidateNested({ each: true }) @Type(() => UsoInsumoRealDto)
  insumos?: UsoInsumoRealDto[];

  @IsOptional() @IsArray() @ArrayMaxSize(50) @ValidateNested({ each: true }) @Type(() => UsoHerramientaRealDto)
  herramientas?: UsoHerramientaRealDto[];

  @IsOptional() @IsString()
  motivo?: string;
}

export class ActualizarActividadDto extends PartialType(CamposActividadDto) {
  // Mano de obra: reemplaza la lista de responsables con sus horas y precio por hora (RF5.2)
  @IsOptional() @IsArray() @ArrayMaxSize(30) @ValidateNested({ each: true }) @Type(() => ResponsableActividadDto)
  responsables?: ResponsableActividadDto[];

  // Motivo del cambio: queda en el historial de la actividad (RF5.9)
  @IsOptional() @IsString()
  motivo?: string;
}
