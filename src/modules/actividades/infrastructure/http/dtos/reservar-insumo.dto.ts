import { IsInt, IsPositive, IsNumber } from 'class-validator';

export class ReservarInsumoDto {
  @IsInt()
  @IsPositive()
  insumoId!: number;

  @IsNumber()
  @IsPositive()
  cantidadReservada!: number;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}