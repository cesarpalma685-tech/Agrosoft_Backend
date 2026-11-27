import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { ActividadResponsableRepositoryPort } from "../../application/ports/actividad-responsable.repository.port";
import { ActividadResponsable } from "../../domain/entities/actividad_responsable.entity";
import { ActividadResponsableOrmEntity } from "../persistence/actividad-responsable.orm-entity";

@Injectable()
export class ActividadResponsableTypeOrmRepository extends ActividadResponsableRepositoryPort {
  constructor(
    @InjectRepository(ActividadResponsableOrmEntity)
    private readonly actividadResponsableRepository: Repository<ActividadResponsableOrmEntity>,
  ) {
    super();
  }

  async save(responsable: ActividadResponsable): Promise<ActividadResponsable> {
    const entity = this.actividadResponsableRepository.create(responsable);
    return await this.actividadResponsableRepository.save(entity);
  }

  async findByActividadIds(ids: number[]) {
    if (ids.length === 0) return [];
    const rows = await this.actividadResponsableRepository.find({
      where: { actividadId: In(ids) },
      relations: { usuario: true },
      order: { id: "ASC" },
    });
    return rows.map(({ usuario, ...row }) => ({
      ...row,
      nombre: usuario ? `${usuario.nombre} ${usuario.apellido}`.trim() : "",
    })) as unknown as (ActividadResponsable & { nombre: string })[];
  }

  async eliminarPorActividad(actividadId: number): Promise<void> {
    await this.actividadResponsableRepository.softDelete({ actividadId });
  }

  async findAll(): Promise<ActividadResponsable[]> {
    return await this.actividadResponsableRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}
