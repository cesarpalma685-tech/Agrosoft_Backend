import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearWikiTipoEpaDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  tipoEpaEnum!: string;
}