import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoFormacionDto } from './create-tipo-formacion.dto';

export class UpdateTipoFormacionDto extends PartialType(CreateTipoFormacionDto) {}
