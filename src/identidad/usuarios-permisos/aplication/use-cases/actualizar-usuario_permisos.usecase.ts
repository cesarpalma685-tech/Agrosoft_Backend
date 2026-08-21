import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioPermiso } from '../../domain/usuarios_permisos.entity';
import { UsuarioPermisoRepository } from '../../domain/usuarios_permisos.repository';

export interface ActualizarUsuarioPermisoInput {
usuarioId?: number;
permisoId?: number;
}

@Injectable()
export class ActualizarUsuarioPermisoUseCase {
constructor(
    private readonly repository: UsuarioPermisoRepository,
) {}

async ejecutar(
    id: number,
    datos: ActualizarUsuarioPermisoInput,
): Promise<UsuarioPermiso> {

const existente = await this.repository.buscarPorId(id);

if (!existente) {
    throw new NotFoundException('Usuario permiso no encontrado');
    }

const usuarioPermiso = new UsuarioPermiso(
    existente.id,
    datos.usuarioId ?? existente.usuarioId,
    datos.permisoId ?? existente.permisoId,
);

    return this.repository.actualizar(usuarioPermiso);
}
}