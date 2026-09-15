import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async findAll(): Promise<ActividadServicio[]> {
    return await this.actividadServicioRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}
