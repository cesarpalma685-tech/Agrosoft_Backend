import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProgramaFormacion } from '../../domain/programa-formacion.entity';
import { ProgramaFormacionRepository } from '../../domain/programa-formacion.repository';
import { ProgramaFormacionOrmEntity } from './programa-formacion.orm-entity';

@Injectable()
export class ProgramaFormacionTypeOrmRepository extends ProgramaFormacionRepository {

  constructor(
    @InjectRepository(ProgramaFormacionOrmEntity)
    private readonly repo: Repository<ProgramaFormacionOrmEntity>,
  ) {
    super();
  }

  async crear(
    programa: ProgramaFormacion,
  ): Promise<ProgramaFormacion> {

    const orm = this.repo.create(
      this.aOrm(programa),
    );

    const guardado = await this.repo.save(orm);

    return this.aDominio(guardado);
  }


  async actualizar(
    programa: ProgramaFormacion,
  ): Promise<ProgramaFormacion> {

    const actualizado = await this.repo.save(
      this.aOrm(programa),
    );

    return this.aDominio(actualizado);
  }


  async eliminar(
    id: number,
  ): Promise<void> {

    await this.repo.delete(id);
  }


  async buscarPorId(
    id: number,
  ): Promise<ProgramaFormacion | null> {

    const programa = await this.repo.findOne({
      where: { id },
    });

    return programa
      ? this.aDominio(programa)
      : null;
  }


  private aDominio(
    orm: ProgramaFormacionOrmEntity,
  ): ProgramaFormacion {

    return new ProgramaFormacion(
      orm.id,
      orm.numeroFicha,
      orm.nombre,
      orm.tipo ?? undefined,
      orm.descripcion ?? undefined,
      orm.fechaInicio ?? undefined,
      orm.fechaFin ?? undefined,
      orm.estado,
      orm.cantidadAprendices,
      orm.created_at,
    );
  }


  private aOrm(
    programa: ProgramaFormacion,
  ): Partial<ProgramaFormacionOrmEntity> {

    return {
      id: programa.id ?? undefined,
      numeroFicha: programa.numeroFicha,
      nombre: programa.nombre,
      tipo: programa.tipo ?? null,
      descripcion: programa.descripcion ?? null,
      fechaInicio: programa.fechaInicio ?? null,
      fechaFin: programa.fechaFin ?? null,
      estado: programa.estado,
      cantidadAprendices: programa.cantidadAprendices,
    };
  }
}