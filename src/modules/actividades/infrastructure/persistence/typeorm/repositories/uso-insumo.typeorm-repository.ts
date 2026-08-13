import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { UsoInsumoRepositoryPort } from '../../../../domain/ports/uso-insumo.repository.port';
import { UsoInsumo } from '../../../../domain/entities/uso-insumo.entity';
import { UsoInsumoOrmEntity } from '../entities/uso-insumo.orm-entity';

@Injectable()
export class UsoInsumoTypeOrmRepository implements UsoInsumoRepositoryPort {
  constructor(
    @InjectRepository(UsoInsumoOrmEntity)
    private readonly repo: Repository<UsoInsumoOrmEntity>,
  ) {}

  async guardar(uso: UsoInsumo): Promise<UsoInsumo> {
    const orm = this.repo.create({
      actividadId: uso.actividadId,
      insumoId: uso.insumoId,
      cantidadUso: uso.cantidadUso,
      costoUnitarioUso: uso.costoUnitarioUso,
      costoTotal: uso.costoTotal,
      movimientoInsumoId: uso.movimientoInsumoId,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<UsoInsumo | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<UsoInsumo[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: UsoInsumoOrmEntity): UsoInsumo {
    return new UsoInsumo(
      orm.id,
      orm.actividadId,
      orm.insumoId,
      orm.cantidadUso,
      orm.costoUnitarioUso,
      orm.costoTotal,
      orm.movimientoInsumoId,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}