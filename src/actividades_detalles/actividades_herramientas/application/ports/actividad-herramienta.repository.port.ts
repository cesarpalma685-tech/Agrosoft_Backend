import { ActividadHerramienta } from '../../domain/entities/actividad-herramienta.entity';

export abstract class ActividadHerramientaRepositoryPort {
  abstract save(herramienta: ActividadHerramienta): Promise<ActividadHerramienta>;

  abstract findByActividadId(actividadId: number): Promise<ActividadHerramienta[]>;
}
