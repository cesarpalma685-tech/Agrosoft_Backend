import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRolDto {

  @IsOptional()
  @IsString()
  nombre?: string;


  @IsOptional()
  @IsString()
  descripcion?: string;


  @IsOptional()
  @IsBoolean()
  es_sistema?: boolean;


  @IsOptional()
  @IsString()
  estado?: string;

}