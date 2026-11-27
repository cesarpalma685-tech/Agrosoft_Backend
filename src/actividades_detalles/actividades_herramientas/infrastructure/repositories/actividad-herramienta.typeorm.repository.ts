import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { ActividadHerramientaRepositoryPort } from "../../application/ports/actividad-herramienta.repository.port";
import { ActividadHerramienta } from "../../domain/entities/actividad-herramienta.entity";
import { ActividadHerramientaOrmEntity } from "../persistence/actividad-herramienta.orm-entity";

@Injectable()
export class ActividadHerramientaTypeOrmRepository extends ActividadHerramientaRepositoryPort {
  constructor(
    @InjectRepository(ActividadHerramientaOrmEntity)
    private readonly actividadHerramientaRepository: Repository<ActividadHerramientaOrmEntity>,
  ) {
    super();
  }

  async save(herramienta: ActividadHerramienta): Promise<ActividadHerramienta> {
    const entity = this.actividadHerramientaRepository.create({
      ...herramienta,
    });

    const saved = await this.actividadHerramientaRepository.save(entity);

    return saved;
  }

  async findByActividadIds(ids: number[]): Promise<ActividadHerramienta[]> {
    if (ids.length === 0) return [];
    return await this.actividadHerramientaRepository.find({
      where: { actividadId: In(ids) },
      order: { id: "ASC" },
    });
  }

  async contarOcupadas(activoFijoId: number): Promise<number> {
    const [fila] = await this.actividadHerramientaRepository.query(
      `SELECT COUNT(*)::int AS total
         FROM actividades_herramientas ah
         JOIN actividades a ON a.id = ah."actividadId"
        WHERE ah."activoFijoId" = $1
          AND ah.deleted_at IS NULL
          AND a.deleted_at IS NULL
          AND a.estado IN ('pendiente', 'en_progreso')`,
      [activoFijoId],
    );
    return Number(fila?.total ?? 0);
  }

  async findAll(): Promise<ActividadHerramienta[]> {
    const entities = await this.actividadHerramientaRepository.find({
      order: {
        createdAt: "DESC",
      },
    });

    return entities;
  }
}
