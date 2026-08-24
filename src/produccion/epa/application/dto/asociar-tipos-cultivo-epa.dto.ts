import { IsArray, IsInt } from 'class-validator';

export class AsociarTiposCultivoEpaDto {
  @IsArray()
  @IsInt({ each: true })
  tipoCultivoWikiIds!: number[];
}