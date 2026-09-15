import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async findAll(): Promise<ActividadResponsable[]> {
    return await this.actividadResponsableRepository.find({
      order: { createdAt: "DESC" },
    });
  }
}
