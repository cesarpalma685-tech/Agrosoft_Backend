import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsuarioPermiso } from '../../domain/usuarios_permisos.entity';
import { UsuarioPermisoRepository } from '../../domain/usuarios_permisos.repository'
import { UsuarioPermisoOrmEntity } from './usuario_permisos.orm-entity';

@Injectable()
export class UsuarioPermisoTypeOrmRepository extends UsuarioPermisoRepository {
constructor(
    @InjectRepository(UsuarioPermisoOrmEntity)
    private readonly repo: Repository<UsuarioPermisoOrmEntity>,
  ) {
    super();
  }

async crear(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso> {
    const orm = this.repo.create(this.aOrm(usuarioPermiso));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
}

async actualizar(usuarioPermiso: UsuarioPermiso): Promise<UsuarioPermiso> {
    const actualizado = await this.repo.save(this.aOrm(usuarioPermiso));
    return this.aDominio(actualizado);
}

async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
}

async buscarPorId(id: number): Promise<UsuarioPermiso | null> {
const usuarioPermiso = await this.repo.findOne({
where: { id },
});

return usuarioPermiso
? this.aDominio(usuarioPermiso): null;
}

private aDominio(
    orm: UsuarioPermisoOrmEntity,): UsuarioPermiso {
    return new UsuarioPermiso(
    orm.id,
    orm.usuarioId,
    orm.permisoId,
    );
}

private aOrm(
    usuarioPermiso: UsuarioPermiso,
): Partial<UsuarioPermisoOrmEntity> {
    return {
    id: usuarioPermiso.id ?? undefined,
    usuarioId: usuarioPermiso.usuarioId,
    permisoId: usuarioPermiso.permisoId,
    };
}
}