import { Injectable } from '@nestjs/common';
import { RolPermisoRepository } from '../ports/rol_permisos.repository';
import { RolPermiso } from '../../domain/entities/rol_permisos.entity';

export interface CrearRolPermisoInput {
  rolId: number;
  permisoId: number;
}

@Injectable()
export class CrearRolPermisoUseCase {

constructor(
    private readonly repository: RolPermisoRepository,
) {}

async ejecutar(datos: CrearRolPermisoInput): Promise<RolPermiso> {

    const rolPermiso = new RolPermiso(
    null,
    datos.rolId,
    datos.permisoId,
    new Date(),
    );

    return this.repository.crear(rolPermiso);
}
}