import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { ActividadServicioRepositoryPort } from "../../application/ports/actividad-servicio.repository.port";
import { ActividadServicio } from "../../domain/entities/actividad-servicio.entity";
import { ActividadServicioOrmEntity } from "../persistence/actividad-servicio.orm-entity";

@Injectable()
export class ActividadServicioTypeOrmRepository extends ActividadServicioRepositoryPort {
  constructor(
    @InjectRepository(ActividadServicioOrmEntity)
    private readonly actividadServicioRepository: Repository<ActividadServicioOrmEntity>,
  ) {
    super();
  }

  async save(servicio: ActividadServicio): Promise<ActividadServicio> {
    const entity = this.actividadServicioRepository.create({ ...servicio });
    return await this.actividadServicioRepository.save(entity);
  }

  async findByActividadIds(ids: number[]): Promise<ActividadServicio[]> {
    if (ids.length === 0) return [];
    return await this.actividadServicioRepository.find({ where: { actividadId: In(ids) }, order: { id: "ASC" } });
  }

  async findAll(): Promise<ActividadServicio[]> {
    return await this.actividadServicioRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}
