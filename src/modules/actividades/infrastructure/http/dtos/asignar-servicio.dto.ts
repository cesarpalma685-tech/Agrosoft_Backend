import { IsInt, IsPositive, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class AsignarServicioDto {
  @IsInt()
  @IsPositive()
  maquinariaId!: number;

  @IsString()
  @IsNotEmpty()
  nombreServicio!: string;

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