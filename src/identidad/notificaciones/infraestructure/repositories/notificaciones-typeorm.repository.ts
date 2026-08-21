import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notificacion } from '../../domain/entities/notificaciones.entity';
import { NotificacionRepository } from '../../aplication/ports/notificaciones.repository';
import { NotificacionOrmEntity } from '../persistence/notificaciones.orm-entity';

@Injectable()
export class NotificacionTypeOrmRepository extends NotificacionRepository {
  constructor(
    @InjectRepository(NotificacionOrmEntity)
    private readonly repo: Repository<NotificacionOrmEntity>,
  ) {
    super();
  }

  async crear(notificacion: Notificacion): Promise<Notificacion> {
    const orm = this.repo.create(this.aOrm(notificacion));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async actualizar(notificacion: Notificacion): Promise<Notificacion> {
    const actualizado = await this.repo.save(
      this.aOrm(notificacion),
    );

    return this.aDominio(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async buscarPorId(id: number): Promise<Notificacion | null> {
    const notificacion = await this.repo.findOne({
      where: { id },
    });

    return notificacion
      ? this.aDominio(notificacion)
      : null;
  }

  private aDominio(
    orm: NotificacionOrmEntity,
  ): Notificacion {
    return new Notificacion(
      orm.id,
      orm.usuarioId,
      orm.titulo,
      orm.mensaje,
      orm.leida,
      orm.tipo ?? undefined,
      orm.metadata ?? undefined,
      orm.created_at,
    );
  }

  private aOrm(
    notificacion: Notificacion,
  ): Partial<NotificacionOrmEntity> {
    return {
      id: notificacion.id ?? undefined,
      usuarioId: notificacion.usuarioId,
      titulo: notificacion.titulo,
      mensaje: notificacion.mensaje,
      leida: notificacion.leida,
      tipo: notificacion.tipo ?? null,
      metadata: notificacion.metadata ?? null,
    };
  }
}