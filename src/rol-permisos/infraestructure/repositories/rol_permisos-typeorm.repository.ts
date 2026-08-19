import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermiso } from '../../domain/entities/rol_permisos.entity';
import { RolPermisoRepository } from '../../aplication/ports/rol_permisos.repository';
import { RolPermisoOrmEntity } from '../persistence/rol_permisos.orm-entity';

@Injectable()
export class RolPermisoTypeOrmRepository extends RolPermisoRepository {

  constructor(
    @InjectRepository(RolPermisoOrmEntity)
    private readonly repo: Repository<RolPermisoOrmEntity>,
  ) {
    super();
  }

  async crear(rolPermiso: RolPermiso): Promise<RolPermiso> {
    const orm = this.repo.create(this.aOrm(rolPermiso));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async actualizar(rolPermiso: RolPermiso): Promise<RolPermiso> {
    const actualizado = await this.repo.save(this.aOrm(rolPermiso));
    return this.aDominio(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async buscarPorId(id: number): Promise<RolPermiso | null> {
    const rolPermiso = await this.repo.findOne({ where: { id } });
    return rolPermiso ? this.aDominio(rolPermiso) : null;
  }

  private aDominio(orm: RolPermisoOrmEntity): RolPermiso {
    return new RolPermiso(
    orm.id,
    orm.rolId,
    orm.permisoId,
    orm.created_at,
    );
  }

  private aOrm(rolPermiso: RolPermiso): Partial<RolPermisoOrmEntity> {
    return {
    id: rolPermiso.id ?? undefined,
    rolId: rolPermiso.rolId,
    permisoId: rolPermiso.permisoId,
    };
  }
}