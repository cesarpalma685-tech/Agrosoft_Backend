import {
IsDateString,
IsInt,
IsOptional,
IsString,
}
from "class-validator";
export class CrearSensorLecturasDto {
@IsInt()
sensor_id!: number;

@IsString()
valor!: string;

@IsDateString()
fecha_lectura!: string;

@IsString()
 unidad!: string;

@IsString()
@IsOptional()

observaciones?:string;

}