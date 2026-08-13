import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { HerramientaAsignadaRepositoryPort } from '../../../../domain/ports/herramienta-asignada.repository.port';
import { HerramientaAsignada } from '../../../../domain/entities/herramienta-asignada.entity';
import { HerramientaAsignadaOrmEntity } from '../entities/herramienta-asignada.orm-entity';

@Injectable()
export class HerramientaAsignadaTypeOrmRepository
  implements HerramientaAsignadaRepositoryPort
{
  constructor(
    @InjectRepository(HerramientaAsignadaOrmEntity)
    private readonly repo: Repository<HerramientaAsignadaOrmEntity>,
  ) {}

  async guardar(herramienta: HerramientaAsignada): Promise<HerramientaAsignada> {
    const orm = this.repo.create({
      actividadId: herramienta.actividadId,
      activoFijoId: herramienta.activoFijoId,
      horasEstimadas: herramienta.horasEstimadas,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<HerramientaAsignada | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<HerramientaAsignada[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: HerramientaAsignadaOrmEntity): HerramientaAsignada {
    return new HerramientaAsignada(
      orm.id,
      orm.actividadId,
      orm.activoFijoId,
      orm.horasEstimadas,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}