import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateWikiTipoEpaDto {
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