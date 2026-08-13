import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { UsoHerramientaRepositoryPort } from '../../../../domain/ports/uso-herramienta.repository.port';
import { UsoHerramienta } from '../../../../domain/entities/uso-herramienta.entity';
import { UsoHerramientaOrmEntity } from '../entities/uso-herramienta.orm-entity';

@Injectable()
export class UsoHerramientaTypeOrmRepository implements UsoHerramientaRepositoryPort {
  constructor(
    @InjectRepository(UsoHerramientaOrmEntity)
    private readonly repo: Repository<UsoHerramientaOrmEntity>,
  ) {}

  async guardar(uso: UsoHerramienta): Promise<UsoHerramienta> {
    const orm = this.repo.create({
      actividadId: uso.actividadId,
      insumoId: uso.insumoId,
      horasUsadas: uso.horasUsadas,
      depreciacionGenerada: uso.depreciacionGenerada,
      valorEnLibrosAntes: uso.valorEnLibrosAntes,
      valorEnLibrosDespues: uso.valorEnLibrosDespues,
      fechaUso: uso.fechaUso,
    });
    const saved = await this.repo.save(orm);
    return this.toDominio(saved);
  }

  async buscarPorId(id: number): Promise<UsoHerramienta | null> {
    const encontrado = await this.repo.findOne({ where: { id } });
    return encontrado ? this.toDominio(encontrado) : null;
  }

  async listarPorActividad(actividadId: number): Promise<UsoHerramienta[]> {
    const items = await this.repo.find({ where: { actividadId } });
    return items.map((item) => this.toDominio(item));
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private toDominio(orm: UsoHerramientaOrmEntity): UsoHerramienta {
    return new UsoHerramienta(
      orm.id,
      orm.actividadId,
      orm.insumoId,
      orm.horasUsadas,
      orm.depreciacionGenerada,
      orm.valorEnLibrosAntes,
      orm.valorEnLibrosDespues,
      orm.fechaUso,
      orm.createdAt,
      orm.updatedAt,
      orm.deletedAt,
    );
  }
}