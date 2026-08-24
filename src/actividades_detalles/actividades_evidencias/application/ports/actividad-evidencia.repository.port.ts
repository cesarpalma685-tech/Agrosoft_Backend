import { ActividadEvidencia } from '../../domain/entities/actividad_evidencia.entity';

export abstract class ActividadEvidenciaRepositoryPort {
  abstract save(evidencia: ActividadEvidencia): Promise<ActividadEvidencia>;

  abstract findAll(): Promise<ActividadEvidencia[]>;
}
