import { UsoHerramienta } from "../../domain/entities/uso-herramienta.entity";

export abstract class UsoHerramientaRepositoryPort {
  abstract save(uso: UsoHerramienta): Promise<UsoHerramienta>;
  abstract findAll(): Promise<UsoHerramienta[]>;
}
