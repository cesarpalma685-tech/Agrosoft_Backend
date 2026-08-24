import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearTipoCultivoWikiDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}