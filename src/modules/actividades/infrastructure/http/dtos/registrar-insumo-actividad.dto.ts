import { IsInt, IsPositive, IsNumber, IsString, IsNotEmpty, Min } from 'class-validator';

export class RegistrarInsumoActividadDto {
  @IsInt()
  @IsPositive()
  insumoId!: number;

  @IsNumber()
  @IsPositive()
  cantidadUsada!: number;

  @IsString()
  @IsNotEmpty()
  unidad!: string;

  @IsNumber()
  @Min(0)
  costoUnitario!: number;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}