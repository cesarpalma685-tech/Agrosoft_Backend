import { IsInt, IsPositive, IsNumber } from 'class-validator';

export class AsignarResponsableDto {
  @IsInt()
  @IsPositive()
  usuarioId!: number;

  @IsNumber()
  @IsPositive()
  horas!: number;

  @IsNumber()
  @IsPositive()
  precioHora!: number;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}