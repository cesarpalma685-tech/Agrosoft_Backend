import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { ReservaInsumoRepositoryPort } from '../../../../domain/ports/reserva-insumo.repository.port';
import { ReservaInsumo } from '../../../../domain/entities/reserva-insumo.entity';
import { ReservaInsumoOrmEntity } from '../entities/reserva-insumo.orm-entity';

@Injectable()
export class ReservaInsumoTypeOrmRepository implements ReservaInsumoRepositoryPort {
  constructor(
    @InjectRepository(ReservaInsumoOrmEntity)
    private readonly repo: Repository<ReservaInsumoOrmEntity>,
  ) {}

  async guardar(reserva: ReservaInsumo): Promise<ReservaInsumo> {
    const orm = this.repo.create({
      actividadId: reserva.actividadId,
      insumoId: reserva.insumoId,
      cantidadReservada: reserva.cantidadReservada,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<ReservaInsumo | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<ReservaInsumo[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: ReservaInsumoOrmEntity): ReservaInsumo {
    return new ReservaInsumo(
      orm.id,
      orm.actividadId,
      orm.insumoId,
      orm.cantidadReservada,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}