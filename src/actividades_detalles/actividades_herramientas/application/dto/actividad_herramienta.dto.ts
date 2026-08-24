import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class AsignarActividadHerramientaDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  actividadId?: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  activoFijoId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  horasEstimadas!: number;
}
