import { IsInt, IsPositive, IsNumber, Min } from 'class-validator';

export class RegistrarUsoInsumoDto {
  @IsInt()
  @IsPositive()
  insumoId!: number;

  @IsNumber()
  @IsPositive()
  cantidadUso!: number;

  @IsNumber()
  @Min(0)
  costoUnitarioUso!: number;

  @IsInt()
  @IsPositive()
  movimientoInsumoId!: number;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}