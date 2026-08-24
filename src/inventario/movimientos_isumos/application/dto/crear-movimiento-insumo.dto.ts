import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { TipoMovimientoInsumoEnum } from "../../domain/enum/tipo-movimiento-insumo.enum";

export class CrearMovimientoIsumoDto{

    @IsInt()
    @IsNotEmpty()
    insumoId!: number;

    @IsEnum(TipoMovimientoInsumoEnum)
    @IsNotEmpty()
    tipo!:TipoMovimientoInsumoEnum;

    @IsNumber()
    cantidadPresentacion!:number;

    @IsNumber()
    @IsPositive()
    cantidadUso!:number;

    @IsNumber()
    @IsPositive()
    costoUnitarioPresentacion!:number;

    @IsNumber()
    @IsPositive()
    costoUnitarioUso!: number;

    @IsNumber()
    @IsPositive()
    costoTotal!: number;

    @IsNumber()
    @IsPositive()
    valorInventarioResultante!:number;

    @IsString()
    @IsOptional()
    descripcion?:string;

    @IsNumber()
    actividadId!:number;

    @IsNumber()
    usuarioId!:number;

    @IsNumber()
    almacenOrigenId!:number;

    @IsNumber()
    almacenDestinoId!:number;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}