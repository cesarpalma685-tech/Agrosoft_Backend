import { ActividadHerramienta } from "../../domain/entities/actividad-herramienta.entity";
export abstract class ActividadHerramientaRepositoryPort {
  abstract save(
    herramienta: ActividadHerramienta,
  ): Promise<ActividadHerramienta>;

  abstract findAll(): Promise<ActividadHerramienta[]>;
  abstract findByActividadIds(ids: number[]): Promise<ActividadHerramienta[]>;
  // Unidades de la herramienta ocupadas por actividades pendientes o en progreso
  abstract contarOcupadas(activoFijoId: number): Promise<number>;
}
