import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { ServicioRepositoryPort } from '../../../../domain/ports/servicio.repository.port';
import { Servicio } from '../../../../domain/entities/servicio.entity';
import { ServicioOrmEntity } from '../entities/servicio.orm-entity';

@Injectable()
export class ServicioTypeOrmRepository implements ServicioRepositoryPort {
  constructor(
    @InjectRepository(ServicioOrmEntity)
    private readonly repo: Repository<ServicioOrmEntity>,
  ) {}

  async guardar(servicio: Servicio): Promise<Servicio> {
    const orm = this.repo.create({
      actividadId: servicio.actividadId,
      maquinariaId: servicio.maquinariaId,
      nombreServicio: servicio.nombreServicio,
      horas: servicio.horas,
      precioHora: servicio.precioHora,
      costo: servicio.costo,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<Servicio | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<Servicio[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: ServicioOrmEntity): Servicio {
    return new Servicio(
      orm.id,
      orm.actividadId,
      orm.maquinariaId,
      orm.nombreServicio,
      orm.horas,
      orm.precioHora,
      orm.costo,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}