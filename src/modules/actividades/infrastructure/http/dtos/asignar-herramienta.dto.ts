import { IsInt, IsPositive, IsNumber } from 'class-validator';

export class AsignarHerramientaDto {
  @IsInt()
  @IsPositive()
  activoFijoId!: number;

  @IsNumber()
  @IsPositive()
  horasEstimadas!: number;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}