import { IsInt, IsNumber, IsObject, IsString } from "class-validator";

export class CrearSubloteDto {
  @IsString()
  nombre!: string;

  @IsInt()
  lote_id!: number;

  @IsObject()
  geom!: object;

  @IsNumber()
  areaM2!: number;

  @IsNumber()
  areaHa!: number;

  @IsObject()
  centroide!: object;

  @IsString()
  descripcion!: string;

  @IsString()
  estado!: string;
}
