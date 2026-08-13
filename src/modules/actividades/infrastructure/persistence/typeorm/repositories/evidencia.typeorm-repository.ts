import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { EvidenciaRepositoryPort } from '../../../../domain/ports/evidencia.repository.port';
import { Evidencia } from '../../../../domain/entities/evidencia.entity';
import { EvidenciaOrmEntity } from '../entities/evidencia.orm-entity';

@Injectable()
export class EvidenciaTypeOrmRepository implements EvidenciaRepositoryPort {
  constructor(
    @InjectRepository(EvidenciaOrmEntity)
    private readonly repo: Repository<EvidenciaOrmEntity>,
  ) {}

  async guardar(evidencia: Evidencia): Promise<Evidencia> {
    const orm = this.repo.create({
      actividadId: evidencia.actividadId,
      descripcion: evidencia.descripcion,
      imagenes: evidencia.imagenes,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<Evidencia | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<Evidencia[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: EvidenciaOrmEntity): Evidencia {
    return new Evidencia(
      orm.id,
      orm.actividadId,
      orm.descripcion,
      orm.imagenes,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}