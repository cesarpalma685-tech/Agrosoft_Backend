import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoFormacionDto } from '../../aplication/dto/create-tipo-formacion.dto';

export class UpdateTipoFormacionDto extends PartialType(CreateTipoFormacionDto) {}
