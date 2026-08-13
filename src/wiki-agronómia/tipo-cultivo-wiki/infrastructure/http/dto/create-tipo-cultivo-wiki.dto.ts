import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTipoCultivoWikiDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}