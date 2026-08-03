import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { MovimientoProduccionRepository } from '../../domain/movimiento-produccion-repository.port';
import { MovimientoProduccion } from '../../domain/movimiento-produccion.entity';
import { MovimientoProduccionOrmEntity } from './movimiento-produccion.orm-entity';
import { LoteProduccionOrmEntity } from '../../../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity';

@Injectable()
export class MovimientoProduccionTypeOrmRepository implements MovimientoProduccionRepository {
  constructor(
    @InjectRepository(MovimientoProduccionOrmEntity)
    private readonly ormRepo: Repository<MovimientoProduccionOrmEntity>,
    @InjectRepository(LoteProduccionOrmEntity)
    private readonly loteProduccionOrmRepo: Repository<LoteProduccionOrmEntity>,
  ) {}

  async save(movimientoProduccion: MovimientoProduccion): Promise<MovimientoProduccion> {
    const saved = await this.ormRepo.save({
      loteProduccionId: movimientoProduccion.loteProduccionId,
      tipo: movimientoProduccion.tipo,
      cantidadKg: movimientoProduccion.cantidadKg,
      costoUnitarioKg: movimientoProduccion.costoUnitarioKg,
      costoTotal: movimientoProduccion.costoTotal,
      ventaId: movimientoProduccion.ventaId,
      descripcion: movimientoProduccion.descripcion,
      usuarioId: movimientoProduccion.usuarioId,
      fecha: movimientoProduccion.fecha,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<MovimientoProduccion[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<MovimientoProduccion | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  async getStockDisponible(loteProduccionId: number): Promise<number | null> {
    const lote = await this.loteProduccionOrmRepo.findOne({ where: { id: loteProduccionId } });
    return lote ? lote.stockDisponibleKg : null;
  }

  async descontarStock(loteProduccionId: number, delta: number): Promise<void> {
    const lote = await this.loteProduccionOrmRepo.findOne({ where: { id: loteProduccionId } });
    if (!lote) return;
    lote.stockDisponibleKg = lote.stockDisponibleKg + delta;
    await this.loteProduccionOrmRepo.save(lote);
  }

  private toDomain(row: MovimientoProduccionOrmEntity): MovimientoProduccion {
    return MovimientoProduccion.create({
      id: row.id,
      loteProduccionId: row.loteProduccionId,
      tipo: row.tipo,
      cantidadKg: row.cantidadKg,
      costoUnitarioKg: row.costoUnitarioKg,
      costoTotal: row.costoTotal,
      ventaId: row.ventaId,
      descripcion: row.descripcion,
      usuarioId: row.usuarioId,
      fecha: row.fecha,
    });
  }
}