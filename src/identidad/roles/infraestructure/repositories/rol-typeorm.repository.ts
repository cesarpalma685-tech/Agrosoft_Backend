import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Rol } from "../../domain/entities/rol.entity";
import { RolRepository } from "../../aplication/ports/rol.repository";
import { RolOrmEntity } from "../persistence/rol.orm-entity";

@Injectable()
export class RolTypeOrmRepository extends RolRepository {
  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly repo: Repository<RolOrmEntity>,
  ) {
    super();
  }

  async crear(rol: Rol): Promise<Rol> {
    const orm = this.repo.create(this.aOrm(rol));

    const guardado = await this.repo.save(orm);

    return this.aDominio(guardado);
  }

  async actualizar(rol: Rol): Promise<Rol> {
    const orm = this.aOrm(rol);

    const actualizado = await this.repo.save(orm);

    return this.aDominio(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  async buscarPorId(id: number): Promise<Rol | null> {
    const rol = await this.repo.findOne({
      where: { id },
    });

    return rol ? this.aDominio(rol) : null;
  }

  async buscarPorNombre(nombre: string): Promise<Rol | null> {
    const rol = await this.repo.findOne({
      where: { nombre },
    });

    return rol ? this.aDominio(rol) : null;
  }

  private aDominio(orm: RolOrmEntity): Rol {
    return new Rol(
      orm.id,
      orm.nombre,
      orm.descripcion,
      orm.es_sistema,
      orm.estado,
    );
  }

  private aOrm(rol: Rol): Partial<RolOrmEntity> {
    return {
      id: rol.id ?? undefined,
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      es_sistema: rol.es_sistema,
      estado: rol.estado,
    };
  }
}
