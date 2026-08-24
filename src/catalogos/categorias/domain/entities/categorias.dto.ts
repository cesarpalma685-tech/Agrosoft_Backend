import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriasDto {
    id!: number
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;
}