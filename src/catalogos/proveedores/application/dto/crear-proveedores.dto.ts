import { IsNotEmpty, IsString } from "class-validator";

export class ProveedoresDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}
