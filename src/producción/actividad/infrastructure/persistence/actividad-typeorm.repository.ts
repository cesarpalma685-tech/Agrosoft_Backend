import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ActividadRepository } from '../../domain/actividad-repository.port';
import { Actividad } from '../../domain/actividad.entity';
import { ActividadOrmEntity } from './actividad.orm-entity';

@Injectable()
export class ActividadTypeOrmRepository implements ActividadRepository {
  constructor(
    @InjectRepository(ActividadOrmEntity)
    private readonly ormRepo: Repository<ActividadOrmEntity>,
  ) {}

  async save(actividad: Actividad): Promise<Actividad> {
    const saved = await this.ormRepo.save({
      nombre: actividad.nombre,
      tipo: actividad.tipo,
      subtipo: actividad.subtipo,
      loteId: actividad.loteId,
      subLoteId: actividad.subLoteId,
      cultivoId: actividad.cultivoId,
      fecha: actividad.fecha,
      horasActividad: actividad.horasActividad,
      precioHoraActividad: actividad.precioHoraActividad,
      costoManoObra: actividad.costoManoObra,
      descripcion: actividad.descripcion,
      estado: actividad.estado,
      creadoPorUsuarioId: actividad.creadoPorUsuarioId,
      cantidadPlantas: actividad.cantidadPlantas,
      kgRecolectados: actividad.kgRecolectados,
      productoAgroId: actividad.productoAgroId,
    });
    return this.toDomain(saved);
  }

  async findAll(): Promise<Actividad[]> {
    const rows = await this.ormRepo.find({ where: { deletedAt: IsNull() } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<Actividad | null> {
    const row = await this.ormRepo.findOne({ where: { id, deletedAt: IsNull() } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: ActividadOrmEntity): Actividad {
    return Actividad.create({
      id: row.id,
      nombre: row.nombre,
      tipo: row.tipo,
      subtipo: row.subtipo,
      loteId: row.loteId,
      subLoteId: row.subLoteId,
      cultivoId: row.cultivoId,
      fecha: row.fecha,
      horasActividad: row.horasActividad,
      precioHoraActividad: row.precioHoraActividad,
      costoManoObra: row.costoManoObra,
      descripcion: row.descripcion,
      estado: row.estado,
      creadoPorUsuarioId: row.creadoPorUsuarioId,
      cantidadPlantas: row.cantidadPlantas,
      kgRecolectados: row.kgRecolectados,
      productoAgroId: row.productoAgroId,
    });
  }
}