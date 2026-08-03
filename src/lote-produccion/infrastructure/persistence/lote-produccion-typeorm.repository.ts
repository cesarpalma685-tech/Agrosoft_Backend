import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { LoteProduccionRepository } from '../../domain/lote-produccion-repository.port';
import { LoteProduccion } from '../../domain/lote-produccion.entity';
import { LoteProduccionOrmEntity } from './lote-produccion.orm-entity';

@Injectable()
export class LoteProduccionTypeOrmRepository implements LoteProduccionRepository {
  constructor(
    @InjectRepository(LoteProduccionOrmEntity)
    private readonly ormRepo: Repository<LoteProduccionOrmEntity>,
  ) {}

  async save(loteProduccion: LoteProduccion): Promise<LoteProduccion> {
    const saved = await this.ormRepo.save({
      productoAgroId: loteProduccion.productoAgroId,
      cultivoId: loteProduccion.cultivoId,
      loteId: loteProduccion.loteId,
      subLoteId: loteProduccion.subLoteId,
      actividadCosechaId: loteProduccion.actividadCosechaId,
      calidad: loteProduccion.calidad,
      cantidadKg: loteProduccion.cantidadKg,
      stockDisponibleKg: loteProduccion.stockDisponibleKg,
      costoUnitarioKg: loteProduccion.costoUnitarioKg,
      costoTotal: loteProduccion.costoTotal,
      precioSugeridoKg: loteProduccion.precioSugeridoKg,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<LoteProduccion[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<LoteProduccion | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: LoteProduccionOrmEntity): LoteProduccion {
    return LoteProduccion.create({
      id: row.id,
      productoAgroId: row.productoAgroId,
      cultivoId: row.cultivoId,
      loteId: row.loteId,
      subLoteId: row.subLoteId,
      actividadCosechaId: row.actividadCosechaId,
      calidad: row.calidad,
      cantidadKg: row.cantidadKg,
      stockDisponibleKg: row.stockDisponibleKg,
      costoUnitarioKg: row.costoUnitarioKg,
      costoTotal: row.costoTotal,
      precioSugeridoKg: row.precioSugeridoKg,
    });
  }
}