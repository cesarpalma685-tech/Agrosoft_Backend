import { IsInt, IsPositive, IsNumber, Min } from 'class-validator';

export class RegistrarUsoHerramientaDto {
  @IsInt()
  @IsPositive()
  insumoId!: number;

  @IsNumber()
  @IsPositive()
  horasUsadas!: number;

  @IsNumber()
  @Min(0)
  valorEnLibrosAntes!: number;

  @IsNumber()
  @Min(0)
  tasaDepreciacionPorHora!: number;

  @IsInt()
  @IsPositive()
  usuarioQueRegistraId!: number;
}