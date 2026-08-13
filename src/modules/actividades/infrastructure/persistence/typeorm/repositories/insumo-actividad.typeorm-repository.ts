import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { InsumoActividadRepositoryPort } from '../../../../domain/ports/insumo-actividad.repository.port';
import { InsumoActividad } from '../../../../domain/entities/insumo-actividad.entity';
import { InsumoActividadOrmEntity } from '../entities/insumo-actividad.orm-entity';

@Injectable()
export class InsumoActividadTypeOrmRepository implements InsumoActividadRepositoryPort {
  constructor(
    @InjectRepository(InsumoActividadOrmEntity)
    private readonly repo: Repository<InsumoActividadOrmEntity>,
  ) {}

  async guardar(insumo: InsumoActividad): Promise<InsumoActividad> {
    const orm = this.repo.create({
      actividadId: insumo.actividadId,
      insumoId: insumo.insumoId,
      cantidadUsada: insumo.cantidadUsada,
      unidad: insumo.unidad,
      costoUnitario: insumo.costoUnitario,
      costoTotal: insumo.costoTotal,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<InsumoActividad | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<InsumoActividad[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: InsumoActividadOrmEntity): InsumoActividad {
    return new InsumoActividad(
      orm.id,
      orm.actividadId,
      orm.insumoId,
      orm.cantidadUsada,
      orm.unidad,
      orm.costoUnitario,
      orm.costoTotal,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}