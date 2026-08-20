import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { ResponsableRepositoryPort } from '../../../../domain/ports/responsable.repository.port';
import { Responsable } from '../../../../domain/entities/responsable.entity';
import { ResponsableOrmEntity } from '../entities/responsable.orm-entity';

@Injectable()
export class ResponsableTypeOrmRepository implements ResponsableRepositoryPort {
  constructor(
    @InjectRepository(ResponsableOrmEntity)
    private readonly repo: Repository<ResponsableOrmEntity>,
  ) {}

  async guardar(responsable: Responsable): Promise<Responsable> {
  const orm = this.repo.create({
    actividadId: responsable.actividadId,
    usuarioId: responsable.usuarioId,
    horas: responsable.horas,
    precioHora: responsable.precioHora,
    costo: responsable.costo,
  });
  const saved = await this.repo.save(orm);
  return this.toDominio(saved);
}

  async buscarPorId(id: number): Promise<Responsable | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<Responsable[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: ResponsableOrmEntity): Responsable {
    return new Responsable(
      orm.id,
      orm.actividadId,
      orm.usuarioId,
      orm.horas,
      orm.precioHora,
      orm.costo,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}