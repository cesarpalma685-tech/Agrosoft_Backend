import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolOrmEntity } from "../persistence/rol.orm-entity";
import {
  ROL_DESCRIPCIONES,
  RolNombre,
} from "../../domain/enums/rol-nombre.enum";

/**
 * Crea (o asegura) los 3 roles del sistema al arrancar la app.
 * Es idempotente: usa ON CONFLICT (nombre), así que se puede ejecutar
 * cuantas veces sea necesario.
 */
@Injectable()
export class RolesSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(RolesSeeder.name);

  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly repo: Repository<RolOrmEntity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.sembrar();
  }

  async sembrar(): Promise<void> {
    await this.repo.upsert(
      Object.values(RolNombre).map((nombre) => ({
        nombre,
        descripcion: ROL_DESCRIPCIONES[nombre],
        es_sistema: true,
        estado: "activo",
      })),
      ["nombre"],
    );
    this.logger.log("Roles del sistema sembrados");
  }
}
