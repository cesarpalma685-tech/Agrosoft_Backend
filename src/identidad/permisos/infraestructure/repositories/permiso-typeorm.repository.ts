import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permiso } from '../../domain/entities/permisos.entity';
import { PermisoRepository } from '../../aplication/ports/permisos.repository';
import { PermisoOrmEntity } from '../persistence/permiso.orm-entity';

@Injectable()
export class PermisoTypeOrmRepository extends PermisoRepository {
  constructor(
    @InjectRepository(PermisoOrmEntity)
    private readonly repo: Repository<PermisoOrmEntity>,
  ) {
    super();
  }

  async crear(permiso: Permiso): Promise<Permiso> {
    const orm = this.repo.create(this.aOrm(permiso));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async actualizar(permiso: Permiso): Promise<Permiso> {
    const actualizado = await this.repo.save(this.aOrm(permiso));
    return this.aDominio(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

async buscarPorId(id: number): Promise<Permiso | null> {
    const permiso = await this.repo.findOne({
        where: { id },
    });

    return permiso ? this.aDominio(permiso) : null;
}

private aDominio(orm: PermisoOrmEntity): Permiso {
    return new Permiso(
        orm.id,
        orm.modulo,
        orm.accion,
        orm.clave,
        orm.created_at,
    );
}

private aOrm(permiso: Permiso): Partial<PermisoOrmEntity> {
    return {
        id: permiso.id ?? undefined,
        modulo: permiso.modulo,
        accion: permiso.accion,
        clave: permiso.clave,
    };
}
}