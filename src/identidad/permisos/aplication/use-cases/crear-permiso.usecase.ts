import { Injectable } from '@nestjs/common';
import { Permiso } from '../../domain/entities/permisos.entity';
import { PermisoRepository } from '../ports/permisos.repository';

export interface CrearPermisoInput {
modulo: string;
accion: string;
clave: string;
}

@Injectable()
export class CrearPermisoUseCase {
constructor(
    private readonly repository: PermisoRepository,
) {}

async ejecutar(datos: CrearPermisoInput): Promise<Permiso> {
const permiso = new Permiso(
    null,
    datos.modulo,
    datos.accion,
    datos.clave,
    new Date(),
    );

    return this.repository.crear(permiso);
}
}