import { UsoHerramienta } from '../../domain/entities/uso-herramienta.entity';

export abstract class UsoHerramientaRepositoryPort {
  abstract save(usoHerramienta: UsoHerramienta): Promise<UsoHerramienta>;

  abstract findByActividadId(actividadId: number): Promise<UsoHerramienta[]>;
}
