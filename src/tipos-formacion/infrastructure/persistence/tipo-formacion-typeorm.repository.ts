import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoFormacion } from '../../domain/tipo-formacion.entity';
import { TipoFormacionRepository } from '../../domain/tipo-formacion.repository';
import { TipoFormacionOrmEntity } from './tipo-formacion.orm-entity';

@Injectable()
export class TipoFormacionTypeOrmRepository implements TipoFormacionRepository {
  constructor(
    @InjectRepository(TipoFormacionOrmEntity)
    private readonly repo: Repository<TipoFormacionOrmEntity>,
  ) {}

  async crear(tipo: TipoFormacion): Promise<TipoFormacion> {
    const orm = this.repo.create(this.aOrm(tipo));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async buscarPorId(id: number): Promise<TipoFormacion | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? this.aDominio(orm) : null;
  }

  async listar(): Promise<TipoFormacion[]> {
    const registros = await this.repo.find({ order: { orden: 'ASC' } });
    return registros.map((r) => this.aDominio(r));
  }

  async actualizar(tipo: TipoFormacion): Promise<TipoFormacion> {
    const orm = this.aOrm(tipo);
    await this.repo.save(orm);
    return tipo;
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private aDominio(orm: TipoFormacionOrmEntity): TipoFormacion {
    return new TipoFormacion(
      orm.id,
      orm.codigo,
      orm.nombre,
      orm.descripcion,
      orm.tipoEpaEnum,
      orm.activo,
      orm.orden,
      orm.created_at,
    );
  }

  private aOrm(tipo: TipoFormacion): Partial<TipoFormacionOrmEntity> {
    return {
      id: tipo.id ?? undefined,
      codigo: tipo.codigo,
      nombre: tipo.nombre,
      descripcion: tipo.descripcion,
      tipoEpaEnum: tipo.tipoEpaEnum,
      activo: tipo.activo,
      orden: tipo.orden,
    };
  }
}
